import type { ReactNode } from "react";
import "./rule-book.css";

export type RuleTopic = {
  id: string;
  title: string;
  ref: string;
  steps: { title: string; rule: string }[];
};

/** All rules remain visible; anchors navigate without hiding other topics. */
export default function RuleBook({ id, name, subtitle, description, portrait, law, topics, renderExample, children }: {
  id: string; name: string; subtitle?: string; description: string; portrait?: string;
  law: string; topics: RuleTopic[]; renderExample?: (topic: RuleTopic) => ReactNode;
  children?: ReactNode;
}) {
  return <section className={`adventure rule-book ${id}-rule-book`} aria-label={`Luật ${name}`}>
    <header className="adventure-top"><div><span className="eyebrow">{subtitle || "LUẬT VÀ VÍ DỤ"}</span><h1>{name}</h1><p>{description}</p></div>{portrait && <img className="rule-book-portrait" src={portrait} alt="" />}</header>
    <nav id={`${id}-contents`} className="rule-toc" aria-label="Mục lục luật">{topics.map((topic, index) => <a key={topic.id} href={`#${id}-${topic.id}`}><small>{String(index + 1).padStart(2, "0")}</small>{topic.title}</a>)}</nav>
    <div className="rule-topics">{topics.map((topic, index) => <section className="rule-section" id={`${id}-${topic.id}`} key={topic.id} aria-labelledby={`${id}-${topic.id}-heading`}>
      <header className="rule-section-heading"><span className="eyebrow">{String(index + 1).padStart(2, "0")}</span><h2 id={`${id}-${topic.id}-heading`}>{topic.title}</h2><a href={law} target="_blank" rel="noreferrer">Law of Root · {topic.ref}</a></header>
      <div className={`rule-section-body ${renderExample ? "has-example" : ""}`}><div className="rule-section-copy">{topic.steps.map((step, stepIndex) => <div className="rule-point" key={`${step.title}-${stepIndex}`}><h3>{step.title}</h3><p>{step.rule}</p></div>)}</div>{renderExample && <div className="rule-example"><span className="eyebrow">VÍ DỤ TƯƠNG TÁC</span>{renderExample(topic)}</div>}</div>
      <a className="rule-back-top" href={`#${id}-contents`}>Về mục lục</a>
    </section>)}</div>{children}
  </section>;
}
