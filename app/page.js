import ContactForm from './contact-form';

const services = [
  ['Software sob medida', 'Plataformas web, portais e sistemas internos construídos em torno do processo e da estratégia do negócio.'],
  ['Integrações e APIs', 'Conectamos ERPs, CRMs, pagamentos, dados e serviços de terceiros com segurança e observabilidade.'],
  ['IA aplicada ao negócio', 'Copilotos, agentes e automações inteligentes para reduzir trabalho manual e acelerar decisões.'],
  ['Modernização de sistemas', 'Evoluímos aplicações legadas, arquitetura, performance e experiência sem paralisar a operação.'],
  ['MVP e novos produtos', 'Da descoberta ao lançamento: escopo, experiência, engenharia e medição para validar rápido e evoluir certo.'],
  ['Squad de evolução', 'Produto, engenharia e sustentação trabalhando em ciclos contínuos para manter o software competitivo.']
];

const process = [
  ['01', 'Descoberta', 'Entendemos contexto, restrições, usuários e o resultado que o projeto precisa gerar.'],
  ['02', 'Estratégia', 'Traduzimos o desafio em prioridades, arquitetura, escopo e plano de execução.'],
  ['03', 'Construção', 'Design e engenharia avançam em ciclos curtos, com validação frequente e transparência.'],
  ['04', 'Evolução', 'Depois do deploy, medimos, aprendemos e melhoramos produto, performance e operação.']
];

const principles = [
  ['Negócio antes da tecnologia', 'A stack existe para servir ao resultado, não para virar protagonista do projeto.'],
  ['Arquitetura com intenção', 'Escolhas técnicas pensadas para manutenção, segurança, evolução e escala.'],
  ['Comunicação sem ruído', 'Visibilidade sobre decisões, riscos, prioridades e progresso ao longo de todo o trabalho.'],
  ['Qualidade contínua', 'Código sustentável, revisão, testes e observabilidade incorporados ao processo.']
];

const stack = ['Next.js', 'React', 'Node.js', 'TypeScript', 'Python', 'PostgreSQL', 'Neon', 'Vercel', 'Docker', 'Cloud', 'APIs', 'IA generativa'];

const faqs = [
  ['Vocês trabalham apenas com projetos novos?', 'Não. Também atuamos em modernização, integrações, sustentação e evolução de produtos que já estão em produção.'],
  ['A A Castilho pode entrar desde a fase de ideia?', 'Sim. A descoberta é justamente o momento de organizar o problema, reduzir incerteza e definir a melhor primeira versão do produto.'],
  ['Vocês trabalham com inteligência artificial?', 'Sim. Aplicamos IA quando ela melhora um processo, produto ou decisão — com foco em uso prático, integração e governança.'],
  ['Como começa um projeto?', 'Começa com uma conversa sobre contexto, objetivo e restrições. A partir disso estruturamos uma direção técnica e comercial adequada ao desafio.']
];

export default function Home() {
  return (
    <main className="siteHome">
      <header className="nav wrap">
        <a className="brand" href="#inicio" aria-label="A Castilho — início">
          <span className="brandMark">AC</span>
          <span>A Castilho</span>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#solucoes">Soluções</a>
          <a href="#processo">Processo</a>
          <a href="#impacto">Impacto</a>
          <a href="#sobre">Sobre</a>
          <a href="#contato">Orçamento</a>
          <a href="/homologacao">Produtos em homologação</a>
        </nav>
        <a className="button small" href="#contato">Fazer diagnóstico</a>
      </header>

      <section id="inicio" className="hero wrap">
        <div className="heroCopy">
          <div className="eyebrow"><span className="dot"/> SOFTWARE • PRODUTO • IA</div>
          <h1>Seu próximo software começa com um <em>problema de negócio.</em></h1>
          <p>Transformamos desafios complexos em produtos digitais, integrações e soluções com IA — com engenharia sólida e visão de negócio do início à evolução.</p>
          <div className="heroActions">
            <a className="button" href="#contato">Falar sobre meu projeto <span>↗</span></a>
            <a className="ghost" href="#solucoes">Explorar soluções</a>
          </div>
          <div className="trustLine"><span>Estratégia</span><b>+</b><span>Produto</span><b>+</b><span>Engenharia</span></div>
        </div>
        <div className="heroVisual" aria-hidden="true">
          <div className="glow" />
          <div className="codeCard cardFloat">
            <div className="windowDots"><i/><i/><i/></div>
            <code><small>// do problema ao produto</small><br/>const solução = <strong>build</strong>({'{'}<br/>&nbsp;&nbsp;business: <strong>"aligned"</strong>,<br/>&nbsp;&nbsp;architecture: <strong>"ready"</strong>,<br/>&nbsp;&nbsp;evolution: <strong>"continuous"</strong><br/>{'}'});</code>
          </div>
          <div className="metric metricA"><small>Arquitetura</small><b>Escalável</b><span>pensada para evoluir</span></div>
          <div className="metric metricB"><small>Entrega</small><b>Iterativa</b><span>valor em ciclos curtos</span></div>
          <div className="orb"><span>AC</span></div>
        </div>
      </section>

      <section className="signal">
        <div className="wrap signalGrid">
          <p>Além do código</p>
          <h2>Entendemos o desafio, desenhamos a solução e construímos tecnologia preparada para continuar evoluindo.</h2>
        </div>
      </section>

      <section id="solucoes" className="section wrap">
        <div className="sectionHead">
          <div><span className="kicker">SOLUÇÕES</span><h2>Tecnologia que resolve o que realmente importa.</h2></div>
          <p>Da primeira conversa à operação em produção, combinamos produto, engenharia e inteligência artificial para atacar problemas reais.</p>
        </div>
        <div className="serviceGrid serviceGrid3">
          {services.map((s, i) => <article className="serviceCard" key={s[0]}><span className="serviceIndex">0{i+1}</span><h3>{s[0]}</h3><p>{s[1]}</p><span className="arrow">↗</span></article>)}
        </div>
      </section>

      <section id="processo" className="section alt">
        <div className="wrap">
          <div className="sectionHead narrow"><div><span className="kicker">NOSSO PROCESSO</span><h2>Menos achismo. Mais clareza em cada etapa.</h2></div></div>
          <div className="processGrid">
            {process.map((p) => <article key={p[0]}><span>{p[0]}</span><h3>{p[1]}</h3><p>{p[2]}</p></article>)}
          </div>
        </div>
      </section>

      <section id="impacto" className="section wrap">
        <div className="sectionHead">
          <div><span className="kicker">IMPACTO</span><h2>O deploy é uma etapa. O resultado é o objetivo.</h2></div>
          <p>Projetamos tecnologia para melhorar fluxo, velocidade, experiência, integração e capacidade de decisão — sempre conectada a um problema de negócio.</p>
        </div>
        <div className="caseGrid">
          <article className="case caseBig"><div className="caseTag">AUTOMAÇÃO + IA</div><h3>Operações mais inteligentes, com menos tarefas repetitivas.</h3><p>Mapeamos gargalos, organizamos dados e desenhamos fluxos para devolver tempo às pessoas e consistência à operação.</p><div className="caseMetric"><b>↗</b><span>mais capacidade<br/>operacional</span></div></article>
          <article className="case"><div className="caseTag">PRODUTOS DIGITAIS</div><h3>Experiências construídas para começar simples e evoluir com segurança.</h3><div className="miniChart"><i/><i/><i/><i/><i/></div></article>
          <article className="case"><div className="caseTag">INTEGRAÇÕES</div><h3>Sistemas conversando para reduzir atrito, retrabalho e perda de informação.</h3><div className="nodes"><i/><i/><i/><i/><span/></div></article>
        </div>
      </section>

      <section className="section alt principlesSection">
        <div className="wrap">
          <div className="sectionHead">
            <div><span className="kicker">COMO PENSAMOS</span><h2>Engenharia com responsabilidade de negócio.</h2></div>
            <p>Boas decisões técnicas precisam equilibrar hoje e amanhã: velocidade, custo, manutenção, segurança e capacidade de evolução.</p>
          </div>
          <div className="principlesGrid">
            {principles.map((item) => <article key={item[0]}><span className="check">✓</span><h3>{item[0]}</h3><p>{item[1]}</p></article>)}
          </div>
        </div>
      </section>

      <section id="sobre" className="section manifesto">
        <div className="wrap manifestoGrid">
          <div><span className="kicker">A CASTILHO</span><h2>Tecnologia construída para resolver problemas reais.</h2></div>
          <div><p>Somos parceiros de produto e engenharia. Aproximamos estratégia, design e desenvolvimento para construir soluções robustas sem perder velocidade, clareza e proximidade.</p><div className="pillRow"><span>Visão de negócio</span><span>Arquitetura escalável</span><span>Qualidade de código</span><span>Proximidade</span><span>IA aplicada</span></div></div>
        </div>
      </section>

      <section className="stackSection wrap">
        <span className="kicker">TECNOLOGIAS</span>
        <h2 className="stackTitle">Ferramentas modernas. Escolhas guiadas pelo contexto.</h2>
        <div className="stackRow">{stack.map(x => <span key={x}>{x}</span>)}</div>
      </section>

      <section className="section faqSection wrap" id="faq">
        <div className="sectionHead">
          <div><span className="kicker">PERGUNTAS FREQUENTES</span><h2>Antes de começar, alinhe o essencial.</h2></div>
          <p>Se o seu cenário for diferente, ótimo. Projetos bons quase nunca cabem em uma resposta genérica.</p>
        </div>
        <div className="faqGrid">
          {faqs.map(([q, a]) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}
        </div>
      </section>

      <section id="contato" className="ctaSection wrap">
        <div className="ctaGlow" />
        <div className="ctaGrid">
          <div>
            <span className="kicker">VAMOS CONSTRUIR?</span>
            <h2>Deixe a gente entender o que você precisa.</h2>
            <p>Um diagnóstico rápido organiza o contexto do projeto e ajuda nossa equipe a chegar na conversa já entendendo objetivo, estágio, integrações e prioridade.</p>
            <div className="contactBullets"><span>✓ Menos de 2 minutos</span><span>✓ Sem compromisso</span><span>✓ Foco no seu contexto</span></div>
          </div>
          <ContactForm />
        </div>
      </section>

      <footer className="footer wrap">
        <div className="brand"><span className="brandMark">AC</span><span>A Castilho</span></div>
        <p>Software • Produto • IA</p>
        <p>© 2026 A Castilho</p>
      </footer>
    </main>
  );
}
