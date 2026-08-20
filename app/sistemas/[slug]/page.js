import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSystem, systems } from '../data';

export function generateStaticParams() {
  return systems.map((system) => ({ slug: system.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const system = getSystem(slug);
  if (!system) return {};

  return {
    title: system.title,
    description: system.description,
    keywords: system.keywords,
    alternates: { canonical: `/sistemas/${system.slug}` },
    openGraph: {
      title: system.title,
      description: system.description,
      url: `/sistemas/${system.slug}`,
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title: system.title,
      description: system.description
    }
  };
}

export default async function SystemPage({ params }) {
  const { slug } = await params;
  const system = getSystem(slug);
  if (!system) notFound();

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: system.name,
        applicationCategory: 'BusinessApplication',
        description: system.description,
        operatingSystem: 'Web'
      },
      {
        '@type': 'FAQPage',
        mainEntity: system.faqs.map(([question, answer]) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer }
        }))
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'ACS', item: '/' },
          { '@type': 'ListItem', position: 2, name: 'Sistemas', item: '/sistemas' },
          { '@type': 'ListItem', position: 3, name: system.name, item: `/sistemas/${system.slug}` }
        ]
      }
    ]
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
        <div className="heroCopy" style={{ maxWidth: 920 }}>
          <div className="eyebrow"><span className="dot"/> {system.eyebrow.toUpperCase()}</div>
          <h1>{system.name}: <em>{system.title.replace(`${system.name}: `, '')}</em></h1>
          <p>{system.summary}</p>
          <div className="heroActions">
            <Link className="button" href="/#contato">Falar sobre esta solução <span>↗</span></Link>
            <Link className="ghost" href="/sistemas">Ver todos os sistemas</Link>
          </div>
        </div>
      </section>

      <section className="section wrap">
        <div className="sectionHead">
          <div><span className="kicker">COMO AJUDA</span><h2>O que o {system.name} entrega.</h2></div>
          <p>{system.description}</p>
        </div>
        <div className="principlesGrid">
          {system.benefits.map((benefit) => (
            <article key={benefit}><span className="check">✓</span><p>{benefit}</p></article>
          ))}
        </div>
      </section>

      <section className="section faqSection wrap" id="faq">
        <div className="sectionHead">
          <div><span className="kicker">PERGUNTAS FREQUENTES</span><h2>Entenda melhor o {system.name}.</h2></div>
          <p>Respostas baseadas na documentação pública atual do produto.</p>
        </div>
        <div className="faqGrid">
          {system.faqs.map(([question, answer]) => (
            <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>
          ))}
        </div>
      </section>

      <section className="section alt">
        <div className="wrap manifestoGrid">
          <div><span className="kicker">SEGURANÇA</span><h2>Conteúdo público por desenho.</h2></div>
          <div><p>Esta página apresenta somente informações adequadas para divulgação. Segredos, credenciais, dados de clientes, detalhes operacionais sensíveis e superfícies administrativas não fazem parte do conteúdo indexável.</p></div>
        </div>
      </section>

      <footer className="footer wrap">
        <div className="brand"><span className="brandMark">ACS</span><span>ACS</span></div>
        <p>Software • Produto • IA</p>
        <p>© 2026 ACS</p>
      </footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </main>
  );
}
