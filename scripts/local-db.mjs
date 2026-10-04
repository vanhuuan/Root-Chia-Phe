import {existsSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
process.chdir(root);
if(!existsSync('dist/server/wrangler.json')){
  console.error('Run pnpm run build first, then node scripts/local-db.mjs.');
  process.exit(1);
}
const result=spawnSync(process.execPath,[
  '--import','./scripts/sites-env.mjs','./node_modules/wrangler/bin/wrangler.js',
  'd1','execute','DB','--local','--config','dist/server/wrangler.json',
  '--persist-to','.wrangler/state','--file','drizzle/0000_soft_meggan.sql'
],{stdio:'inherit'});
if(result.error){console.error(result.error.message);process.exit(1)}
process.exit(result.status??1);
