import styles from './homologacao.module.css';
import { getPublicHomologationProducts } from './products';

export const metadata = {
  title: 'Produtos em Homologação | ACS',
  description:
    'Conheça e acesse os produtos da ACS que estão disponíveis para avaliação em ambiente de homologação.'
};

export default function HomologacaoPage() {
  const products = getPublicHomologationProducts();

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a className={styles.brand} href="/" aria-label="ACS — início">
          <span className={styles.brandMark}>ACS</span>
          <span>ACS</span>
        </a>
        <nav className={styles.nav} aria-label="Navegação da homologação">
          <a href="/">Início</a><a href="/#solucoes">Soluções</a><a href="/#contato">Contato</a>
        </nav>
        <a className={styles.backLink} href="/">Voltar ao site</a>
      </header>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.kicker}>LAB ACS</span>
          <h1>Produtos em <em>homologação.</em></h1>
          <p>Aqui você pode conhecer e testar produtos que já alcançaram uma versão demonstrável e estão passando por validação antes da versão definitiva.</p>
        </div>
        <aside className={styles.notice}><span className={styles.noticeDot} /><div><strong>Ambiente de avaliação</strong><p>Recursos, dados e interfaces podem mudar enquanto o produto está em homologação.</p></div></aside>
      </section>
      <section className={styles.catalog} aria-labelledby="catalog-title">
        <div className={styles.catalogHead}><div><span className={styles.kicker}>DISPONÍVEIS AGORA</span><h2 id="catalog-title">Explore nossos produtos.</h2></div><p>Apenas produtos liberados para avaliação externa aparecem nesta área.</p></div>
        {products.length > 0 ? <div className={styles.grid}>{products.map((product) => <article className={styles.card} key={product.slug}><div className={styles.cardTop}><span className={styles.status}><i /> {product.statusLabel}</span>{product.updatedAt ? <span className={styles.updated}>Atualizado em {product.updatedAt}</span> : null}</div><div className={styles.productMark} aria-hidden="true">{product.name.slice(0, 2).toUpperCase()}</div><h3>{product.name}</h3><p className={styles.description}>{product.description}</p><div className={styles.tags}>{product.highlights?.map((highlight) => <span key={highlight}>{highlight}</span>)}</div><div className={styles.cardFooter}><div><small>STATUS</small><strong>{product.statusLabel}</strong></div>{product.publicUrl ? <a className={styles.accessButton} href={product.publicUrl} target="_blank" rel="noreferrer">Acessar homologação <span>↗</span></a> : <span className={styles.disabledButton}>Link em configuração</span>}</div></article>)}</div> : <div className={styles.emptyState}><span>ACS</span><h3>Nenhum produto público em homologação agora.</h3><p>Novas versões liberadas para avaliação aparecerão aqui.</p></div>}
      </section>
      <section className={styles.feedback}><div><span className={styles.kicker}>SEU FEEDBACK IMPORTA</span><h2>Encontrou algo que podemos melhorar?</h2></div><div><p>A homologação existe para validar o produto em cenários reais. Compartilhe sua experiência com a nossa equipe.</p><a href="/#contato">Enviar feedback <span>↗</span></a></div></section>
      <footer className={styles.footer}><div className={styles.brand}><span className={styles.brandMark}>ACS</span><span>ACS</span></div><p>Software • Produto • IA</p><p>© 2026 ACS</p></footer>
    </main>
  );
}
