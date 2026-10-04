# Azure deployment — Root • Chia phe

The app is a standard Next.js 16.3.4 Node server. The `runner` Docker target
contains standalone output, public assets and `.next/static`, runs as UID 1001,
and listens on `0.0.0.0:3000`. The separate `migrator` target applies PostgreSQL
migrations explicitly. No database connection or secret is needed to build.
This follows [Next.js standalone output](https://nextjs.org/docs/app/api-reference/config/next-config-js/output).

These are operator instructions, not an executed deployment. Commands that
create resources incur Azure charges. Review region, quota, sizing and costs
and authorize deployment before running them. No production services or data
were accessed during the migration.

## Prerequisites and placeholders

Use current Azure CLI, Docker's Linux engine and PowerShell. All `<...>` values
below are placeholders. Run one block at a time and stop on a nonzero
`$LASTEXITCODE`; do not continue after a failed migration or deployment command.
Use unique, lowercase server/registry names. Keep an immutable release tag that
also works as a revision suffix: lowercase letters, digits and dashes, for
example `r20261004-1` (avoid dots/underscores and leave room for `-probes`).

```powershell
az login
az account set --subscription '<SUBSCRIPTION_ID>'
az extension add --name containerapp --upgrade
az provider register --namespace Microsoft.App
az provider register --namespace Microsoft.OperationalInsights
az provider register --namespace Microsoft.DBforPostgreSQL
az provider register --namespace Microsoft.ContainerRegistry

$resourceGroup = '<RESOURCE_GROUP>'
$location = '<AZURE_REGION>'
$registry = '<GLOBALLY_UNIQUE_ACR_NAME>'
$environment = '<CONTAINER_APPS_ENVIRONMENT>'
$appName = '<CONTAINER_APP_NAME>'
$jobName = '<MIGRATION_JOB_NAME>'
$pgServer = '<GLOBALLY_UNIQUE_POSTGRES_SERVER_NAME>'
$pgAdmin = '<POSTGRES_ADMIN_USERNAME>'
$release = '<IMMUTABLE_RELEASE_TAG>'
$siteUrl = 'https://<YOUR_PUBLIC_APP_OR_CUSTOM_DOMAIN>'
```

## Provision networking, registry and PostgreSQL

This example uses a workload-profiles Container Apps environment in a VNet,
with NAT Gateway for a stable outbound public IP. PostgreSQL exposes its TLS
endpoint but accepts only that IP. The app and migration job share the
environment's network. NAT Gateway and its IP have additional cost.
Alternatively use a private PostgreSQL endpoint/VNet integration, linked
private DNS and an environment with access to that VNet; do not use the public
firewall commands for that topology.
See [Container Apps networking](https://learn.microsoft.com/en-us/azure/container-apps/networking).

```powershell
az group create --name $resourceGroup --location $location --output none
az acr create --name $registry --resource-group $resourceGroup --sku Basic --admin-enabled false --output none
az network vnet create --resource-group $resourceGroup --name root-vnet --address-prefixes 10.20.0.0/16 --output none
az network vnet subnet create --resource-group $resourceGroup --vnet-name root-vnet --name aca --address-prefixes 10.20.0.0/23 --delegations Microsoft.App/environments --output none
az network public-ip create --resource-group $resourceGroup --name root-egress --sku Standard --allocation-method Static --output none
az network nat gateway create --resource-group $resourceGroup --name root-nat --public-ip-addresses root-egress --output none
az network vnet subnet update --resource-group $resourceGroup --vnet-name root-vnet --name aca --nat-gateway root-nat --output none
$subnetId = az network vnet subnet show --resource-group $resourceGroup --vnet-name root-vnet --name aca --query id --output tsv
az containerapp env create --name $environment --resource-group $resourceGroup --location $location --enable-workload-profiles --infrastructure-subnet-resource-id $subnetId --output none
$egressIp = az network public-ip show --resource-group $resourceGroup --name root-egress --query ipAddress --output tsv

# Prompt: keep the password out of source files and typed shell history.
$securePassword = Read-Host 'New PostgreSQL administrator password' -AsSecureString
$pgPassword = [System.Net.NetworkCredential]::new('', $securePassword).Password
az postgres flexible-server create --resource-group $resourceGroup --name $pgServer --location $location --admin-user $pgAdmin --admin-password $pgPassword --version 17 --tier Burstable --sku-name Standard_B1ms --storage-size 32 --public-access None --output none
az postgres flexible-server db create --resource-group $resourceGroup --server-name $pgServer --database-name root_chia_phe --output none
az postgres flexible-server firewall-rule create --resource-group $resourceGroup --name $pgServer --rule-name aca-egress --start-ip-address $egressIp --end-ip-address $egressIp --output none
$pgHost = az postgres flexible-server show --resource-group $resourceGroup --name $pgServer --query fullyQualifiedDomainName --output tsv
$encodedUser = [Uri]::EscapeDataString($pgAdmin)
$encodedPassword = [Uri]::EscapeDataString($pgPassword)
$databaseUrl = "postgresql://${encodedUser}:${encodedPassword}@${pgHost}:5432/root_chia_phe?sslmode=verify-full"
```

For an existing server, retain its access controls and substitute its endpoint.
Never open `0.0.0.0–255.255.255.255` or enable the broad “all Azure services”
exception to fix connectivity. Permit outbound TCP 5432 and DNS resolution from
both app and job. For private networking, use the server hostname that matches
its certificate, not a raw IP. Server TLS must remain enabled. Our driver uses
TLS >=1.2 with certificate/hostname validation for remote URLs, including
`sslmode=require`; it never uses `rejectUnauthorized:false`.
See [PostgreSQL TLS](https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/how-to-connect-tls-ssl)
and [Flexible Server CLI](https://learn.microsoft.com/en-us/cli/azure/postgres/flexible-server?view=azure-cli-latest).

The administrator URL above bootstraps a fresh database. For production,
provision a database owner/migration role and a separate application login
with `CONNECT`, schema `USAGE`, and `SELECT`, `INSERT`, `UPDATE` on `rooms` and
`room_members`. Use that application's URL for the app secret and the owner's
URL for the job secret. The app needs no schema-creation or database-creation
permission. Define default grants for subsequent migrations. Use an approved
secret-management process to create these roles, not committed passwords.

## Build and push both images

`NEXT_PUBLIC_SITE_URL` is a public, build-time metadata value. Set it to the
custom domain you intend to use, or rebuild with the generated app FQDN after
initial creation. It must contain no secrets. Reuse unchanged release tags only
for local testing; publish a new tag for every deployable release.

```powershell
$registryHost = az acr show --name $registry --resource-group $resourceGroup --query loginServer --output tsv
$appImage = "${registryHost}/root-chia-phe:${release}"
$migrationImage = "${registryHost}/root-chia-phe-migrator:${release}"
az acr login --name $registry
docker build --platform linux/amd64 --target runner --build-arg "NEXT_PUBLIC_SITE_URL=$siteUrl" --tag $appImage .
docker build --platform linux/amd64 --target migrator --tag $migrationImage .
docker push $appImage
docker push $migrationImage
```

No `DATABASE_URL` build argument is accepted. `.dockerignore` excludes `.env`,
local databases, keys, caches and generated outputs. Only runtime containers
receive secrets. Do not attach `.env` to a build context or pipeline artifact.

## Identity and explicit migration job

Use a user-assigned managed identity to pull from ACR; keep ACR admin credentials
disabled. With the registry's conventional RBAC mode, assign `AcrPull`. If the
registry uses ABAC repository permissions, use its corresponding repository
reader role instead. Role propagation may take a few minutes.
See [managed identity image pulls](https://learn.microsoft.com/en-us/azure/container-apps/managed-identity-image-pull).

```powershell
az identity create --resource-group $resourceGroup --name root-image-pull --output none
$identityId = az identity show --resource-group $resourceGroup --name root-image-pull --query id --output tsv
$principalId = az identity show --resource-group $resourceGroup --name root-image-pull --query principalId --output tsv
$registryId = az acr show --name $registry --resource-group $resourceGroup --query id --output tsv
az role assignment create --assignee-object-id $principalId --assignee-principal-type ServicePrincipal --role AcrPull --scope $registryId --output none

# Use a migration-role URL here if using separate DB roles.
$migrationDatabaseUrl = $databaseUrl
az containerapp job create --name $jobName --resource-group $resourceGroup --environment $environment --trigger-type Manual --replica-timeout 600 --replica-retry-limit 0 --replica-completion-count 1 --parallelism 1 --cpu 0.25 --memory 0.5Gi --image $migrationImage --mi-user-assigned $identityId --registry-server $registryHost --registry-identity $identityId --secrets "database-url=$migrationDatabaseUrl" --env-vars 'DATABASE_URL=secretref:database-url' --output none
$execution = az containerapp job start --name $jobName --resource-group $resourceGroup --query name --output tsv
az containerapp job execution show --name $jobName --resource-group $resourceGroup --job-execution-name $execution --query properties.status --output tsv
az containerapp job logs show --name $jobName --resource-group $resourceGroup --execution $execution --container $jobName --tail 100
```

Poll execution status until it is **Succeeded**; `job start` only submits work.
If logs are not yet available, retry after the execution begins. Stop the
deployment on **Failed** or a timeout. A failed SQL migration rolls back the
transaction. Repeat runs skip previously applied migrations; applied hashes are
checked and a PostgreSQL advisory lock prevents overlapping jobs from racing.
Do not run migrations in a replica startup command or liveness probe.
See [Container Apps jobs](https://learn.microsoft.com/en-us/azure/container-apps/jobs)
and [job CLI](https://learn.microsoft.com/en-us/cli/azure/containerapp/job?view=azure-cli-latest).

## Create app, secrets, ingress and probes

Use the restricted application's connection string for `$databaseUrl` after
bootstrap. The Container App stores it as a secret and exposes only a secret
reference in the environment. HTTPS ingress terminates at Azure; the internal
container target port is 3000. This preserves the app's anonymous guest model.

```powershell
az containerapp create --name $appName --resource-group $resourceGroup --environment $environment --image $appImage --user-assigned $identityId --registry-server $registryHost --registry-identity $identityId --ingress external --target-port 3000 --transport auto --revisions-mode multiple --revision-suffix $release --cpu 0.5 --memory 1Gi --min-replicas 1 --max-replicas 3 --secrets "database-url=$databaseUrl" --env-vars 'DATABASE_URL=secretref:database-url' 'NODE_ENV=production' 'HOSTNAME=0.0.0.0' 'PORT=3000' --output none
$fqdn = az containerapp show --name $appName --resource-group $resourceGroup --query properties.configuration.ingress.fqdn --output tsv
Invoke-RestMethod "https://$fqdn/api/health"
```

Set HTTP startup, readiness and liveness probes explicitly. `/api/health`
returns only `{"status":"ok"}` and checks process health, not database health.
It avoids restarting healthy app processes during a database outage. Verify
database functionality separately before routing traffic.

```powershell
# Update just the template; keep existing secret values and registry settings.
$template = az containerapp show --name $appName --resource-group $resourceGroup --query properties.template --output json | ConvertFrom-Json
$probes = @(
  @{ type='Startup'; httpGet=@{path='/api/health';port=3000;scheme='HTTP'}; initialDelaySeconds=2; periodSeconds=2; timeoutSeconds=2; failureThreshold=30 },
  @{ type='Readiness'; httpGet=@{path='/api/health';port=3000;scheme='HTTP'}; initialDelaySeconds=3; periodSeconds=5; timeoutSeconds=2; failureThreshold=3 },
  @{ type='Liveness'; httpGet=@{path='/api/health';port=3000;scheme='HTTP'}; initialDelaySeconds=10; periodSeconds=10; timeoutSeconds=2; failureThreshold=3 }
)
$template.containers[0] | Add-Member -NotePropertyName probes -NotePropertyValue $probes -Force
$template | Add-Member -NotePropertyName revisionSuffix -NotePropertyValue "${release}-probes" -Force
New-Item -ItemType Directory -Force artifacts | Out-Null
@{ properties=@{ template=$template } } | ConvertTo-Json -Depth 50 | Set-Content -Encoding utf8 artifacts/azure-probes.json
# JSON is valid YAML; this file contains template settings and secret references only.
az containerapp update --name $appName --resource-group $resourceGroup --yaml artifacts/azure-probes.json --output none
az containerapp revision list --name $appName --resource-group $resourceGroup --output table
```

Select the healthy probe-enabled revision from that list, validate its revision
URL, then assign traffic explicitly as shown below. Azure does not use Docker's
`HEALTHCHECK` as a substitute for Container Apps probes.
See [health probes](https://learn.microsoft.com/en-us/azure/container-apps/health-probes)
and [Container App CLI](https://learn.microsoft.com/en-us/cli/azure/containerapp?view=azure-cli-latest).

## Updates and application rollback

Use backwards-compatible, additive database changes so the old and new app
revisions can run together. Before deployment, take/verify an appropriate
database backup. Build and push both new images with `$release` changed to a new
unique tag; rerun the build/push block to recalculate both image names. Record
the current healthy revision name as `$previousRevision`.
Pin its traffic to 100% before creating a candidate; do not leave traffic on the
`latest` alias if you want an explicit validation gate.

```powershell
$previousRevision = '<CURRENT_HEALTHY_REVISION_NAME>'
az containerapp ingress traffic set --name $appName --resource-group $resourceGroup --revision-weight "${previousRevision}=100" --output none
az containerapp job update --name $jobName --resource-group $resourceGroup --image $migrationImage --output none
$execution = az containerapp job start --name $jobName --resource-group $resourceGroup --query name --output tsv
az containerapp job execution show --name $jobName --resource-group $resourceGroup --job-execution-name $execution --query properties.status --output tsv
# Continue ONLY after migration status is Succeeded.
az containerapp update --name $appName --resource-group $resourceGroup --image $appImage --revision-suffix $release --output none
az containerapp revision list --name $appName --resource-group $resourceGroup --output table
$newRevision = '<NEW_HEALTHY_REVISION_NAME>'
az containerapp revision show --name $appName --resource-group $resourceGroup --revision $newRevision --query properties.fqdn --output tsv
# Validate health, pages and room create/join/save via the new revision URL.
az containerapp ingress traffic set --name $appName --resource-group $resourceGroup --revision-weight "${newRevision}=100" --output none

# Application rollback: reactivate the previous revision if needed and move traffic.
az containerapp revision activate --name $appName --resource-group $resourceGroup --revision $previousRevision --output none
az containerapp ingress traffic set --name $appName --resource-group $resourceGroup --revision-weight "${previousRevision}=100" --output none
```

Rolling back an app revision **does not roll back database migrations**. Do not
delete migration history or automatically reverse schema changes. A destructive
schema/data rollback requires a separate backup/restore plan. Keep previous
images and revisions until the release is accepted.
See [revision CLI](https://learn.microsoft.com/en-us/cli/azure/containerapp/revision?view=azure-cli-latest)
and [traffic splitting](https://learn.microsoft.com/en-us/azure/container-apps/traffic-splitting?pivots=azure-cli).

## Operations and secret rotation

```powershell
az containerapp logs show --name $appName --resource-group $resourceGroup --type console --follow --tail 100
az containerapp logs show --name $appName --resource-group $resourceGroup --type system --tail 100
# After obtaining a new URL through your approved secret process:
az containerapp secret set --name $appName --resource-group $resourceGroup --secrets "database-url=$databaseUrl" --output none
az containerapp revision restart --name $appName --resource-group $resourceGroup --revision '<ACTIVE_REVISION_NAME>' --output none
az containerapp job secret set --name $jobName --resource-group $resourceGroup --secrets "database-url=$migrationDatabaseUrl" --output none
```

Restart each active app revision after rotating its secret. New job executions
use the updated job secret. Console/system logs should not contain secrets; the
app logs only a generic message for unexpected database errors. Check DNS,
firewall/NAT egress, server availability, role grants and TLS trust when room
requests fail. A maximum of 10 PostgreSQL connections is pooled per Node process;
budget database connections across replicas and migration jobs.
See [secrets CLI](https://learn.microsoft.com/en-us/cli/azure/containerapp/secret?view=azure-cli-latest)
and [logs CLI](https://learn.microsoft.com/en-us/cli/azure/containerapp/logs?view=azure-cli-latest).

## Authentication and validation boundaries

Sites sign-in/sign-out/callback routes, identity headers and local mock cookies
are removed. They were not used by the app's room UI. Guest IDs remain in
localStorage; room codes remain share links. The host-ID request/response
contract is preserved, including its existing weakness: an exposed host ID is
not authenticated authorization. Sites workspace access restrictions do not
carry over to Azure external ingress. This migration does not add Entra ID or
another login system.

Azure CLI flags and configuration were checked against the official Microsoft
and Next.js references linked above on 2026-10-04. They were not executed against
Azure. Local verification results are recorded in `VALIDATION.md`; cloud
networking, Azure TLS chains, resource provisioning, jobs and revision rollout
still require validation in the authorized target subscription.
