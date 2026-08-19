'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './reports.module.css';

const IDEA_URL = 'https://github.com/a-castilho/a-castilho-site/issues/new?template=idea.yml';

function Body({ content }) {
  const blocks = [];
  let inCode = false;
  let code = [];
  String(content || '').split('\n').forEach((line, index) => {
    if (line.trim().startsWith('```')) {
      if (inCode) { blocks.push(<pre key={`c-${index}`}><code>{code.join('\n')}</code></pre>); code = []; }
      inCode = !inCode; return;
    }
    if (inCode) { code.push(line); return; }
    if (line.startsWith('### ')) blocks.push(<h4 key={index}>{line.slice(4)}</h4>);
    else if (line.startsWith('## ')) blocks.push(<h3 key={index}>{line.slice(3)}</h3>);
    else if (line.startsWith('# ')) blocks.push(<h2 key={index}>{line.slice(2)}</h2>);
    else if (/^[-*] /.test(line)) blocks.push(<div className={styles.bullet} key={index}><span>•</span><p>{line.slice(2)}</p></div>);
    else if (line.trim()) blocks.push(<p key={index}>{line}</p>);
  });
  return <div className={styles.markdown}>{blocks}</div>;
}

export default function ReportClient() {
  const [report, setReport] = useState(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todos');
  const [selectedId, setSelectedId] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('/project-report.json', { cache: 'no-store' })
      .then((res) => { if (!res.ok) throw new Error('Relatório ainda não disponível nesta versão.'); return res.json(); })
      .then((data) => { setReport(data); setSelectedId(data.documents?.[0]?.id || ''); })
      .catch((err) => setError(err.message));
  }, []);

  const categories = useMemo(() => ['Todos', ...new Set((report?.documents || []).map((item) => item.category).filter(Boolean))], [report]);
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return (report?.documents || []).filter((item) => (category === 'Todos' || item.category === category) && (!needle || `${item.title} ${item.source} ${item.content}`.toLowerCase().includes(needle)));
  }, [report, query, category]);
  const selected = (report?.documents || []).find((item) => item.id === selectedId) || filtered[0];

  async function copy() {
    if (!selected) return;
    await navigator.clipboard.writeText(`[ACS · ${selected.category}] ${selected.title}\nFonte: ${selected.source}\n\n${selected.content}`);
    setCopied(true); window.setTimeout(() => setCopied(false), 1600);
  }

  return <main className={styles.page}>
    <header className={styles.header}><a className={styles.brand} href="/homologacao"><span>ACS</span><strong>LAB</strong></a><nav><a href="/homologacao">Produtos</a><a className={styles.active} href="/homologacao/relatorios">Relatórios</a><a href="/">Site</a></nav></header>
    <section className={styles.hero}><div><span className={styles.kicker}>HOMOLOGAÇÃO · DOCUMENTAÇÃO VIVA</span><h1>Relatórios do <em>projeto.</em></h1><p>Uma leitura simples das decisões, revisões e ideias que ajudam a comparar o planejado com o que realmente foi entregue.</p></div><div className={styles.actions}><button onClick={copy} disabled={!selected}>{copied ? 'Copiado' : 'Copiar para conversa'}</button><a href={IDEA_URL} target="_blank" rel="noreferrer">+ Nova ideia</a></div></section>
    {error ? <div className={styles.empty}>{error}</div> : !report ? <div className={styles.empty}>Carregando documentação sanitizada...</div> : <>
      <section className={styles.privacy}><span>✓</span><div><strong>Projeção pública sanitizada</strong><p>{report.privacy?.notice}</p></div></section>
      <section className={styles.toolbar}><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Buscar em relatórios, revisões e ideias..."/><select value={category} onChange={(e)=>setCategory(e.target.value)}>{categories.map((item)=><option key={item}>{item}</option>)}</select></section>
      <section className={styles.layout}><aside className={styles.index}>{filtered.map((item)=><button key={item.id} className={selected?.id===item.id?styles.selected:''} onClick={()=>setSelectedId(item.id)}><span>{item.category}</span><strong>{item.title}</strong><small>{item.source}</small></button>)}{!filtered.length&&<div className={styles.empty}>Nenhum documento encontrado.</div>}</aside><article className={styles.reader}>{selected?<><div className={styles.readerHead}><div><span>{selected.category}</span><h2>{selected.title}</h2></div><code>{selected.source}</code></div><Body content={selected.content}/></>:<div className={styles.empty}>Selecione um documento.</div>}</article></section>
    </>}
  </main>;
}
