import Link from 'next/link';
import { systems } from './data';

export const metadata = {
  title: 'Sistemas e produtos digitais',
  description: 'Conheça os sistemas e produtos digitais desenvolvidos pela ACS para inteligência regulatória, prospecção comercial e conexão com a natureza por meio de tecnologia e IA.',
  alternates: { canonical: '/sistemas' },
  openGraph: {
    title: 'Sistemas e produtos digitais | ACS',
    description: 'Documentação pública transformada em páginas úteis, claras e indexáveis sobre os produtos da ACS.',
    url: '/sistemas',
    type: 'website'
  }
};

export default function SystemsPage() {
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: systems.map((system, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: system.name,
      url: `/sistemas/${system.slug}`
    }))
  };

  return (
    <main className="siteHome">
      <header className="nav wrap">
        <Link className="brand" href="/" aria-label="ACS — início">
          <span className="brandMark">ACS</span><span>ACS</span>
        </Link>
        <nav aria-label="Navegação de sistemas">
          <Link href="/">Início</Link>
          <Link href="/sistemas">Sistemas</Link>
          <Link href="/#contato">Contato</Link>
        </nav>
      </header>

      <section className="hero wrap" style={{ minHeight: 'auto', paddingBottom: '3rem' }}>
        <div className="heroCopy" style={{ maxWidth: 900 }}>
          <div className="eyebrow"><span className="dot"/> PRODUTOS • DOCUMENTAÇÃO • SEO</div>
          <h1>Sistemas construídos para resolver <em>problemas reais.</em></h1>
          <p>Esta área transforma a documentação pública dos produtos em conteúdo acessível, indexável e útil para quem pesquisa soluções no Google e em outros mecanismos de busca.</p>
        </div>
      </section>

      <section className="section wrap">
        <div className="serviceGrid serviceGrid3">
          {systems.map((system, index) => (
            <article className="serviceCard" key={system.slug}>
              <span className="serviceIndex">0{index + 1}</span>
              <span className="kicker">{system.eyebrow}</span>
              <h2>{system.name}</h2>
              <p>{system.description}</p>
              <Link className="ghost" href={`/sistemas/${system.slug}`} aria-label={`Conhecer ${system.name}`}>
                Ver detalhes ↗
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section alt">
        <div className="wrap manifestoGrid">
          <div><span className="kicker">TRANSPARÊNCIA</span><h2>Documentação pública sem expor dados sensíveis.</h2></div>
          <div><p>As páginas publicadas apresentam benefícios, casos de uso, conceitos e respostas frequentes. Credenciais, tokens, endpoints administrativos, arquitetura sensível e dados de clientes permanecem fora do conteúdo indexável.</p></div>
        </div>
      </section>

      <footer className="footer wrap">
        <div className="brand"><span className="brandMark">ACS</span><span>ACS</span></div>
        <p>Software • Produto • IA</p>
        <p>© 2026 ACS</p>
      </footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
    </main>
  );
}
