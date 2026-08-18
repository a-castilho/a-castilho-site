'use client';

import { useState } from 'react';

const steps = [
  {
    key: 'projectType',
    eyebrow: '1. TIPO DE PROJETO',
    title: 'O que você quer construir?',
    description: 'Escolha a opção que mais se aproxima do seu objetivo. Você pode detalhar tudo no final.',
    options: [
      ['Software sob medida', '</>', 'Web, portal, sistema interno ou aplicativo personalizado'],
      ['MVP / Produto digital', '◎', 'Validação rápida, discovery e construção da primeira versão'],
      ['IA / Automação', 'AI', 'Agentes, copilotos, automações e inteligência aplicada ao processo'],
      ['Evolução / Sustentação', '↗', 'Modernização, co-desenvolvimento, arquitetura e evolução contínua']
    ]
  },
  {
    key: 'integration',
    eyebrow: '2. INTEGRAÇÕES',
    title: 'Seu projeto precisa conversar com algum sistema?',
    description: 'Isso ajuda a entender dependências, segurança e arquitetura desde o início.',
    options: [
      ['Não / Não tenho certeza', '○', 'Podemos mapear isso durante a descoberta'],
      ['Sim, com APIs externas', '⇄', 'Serviços, parceiros, pagamentos ou plataformas de terceiros'],
      ['Sim, com banco de dados externo', '▤', 'Dados existentes, migrações ou sincronização entre sistemas'],
      ['Sim, com ERP / CRM / legado', '⌘', 'Integração com sistemas corporativos e ambientes existentes']
    ]
  },
  {
    key: 'platform',
    eyebrow: '3. PLATAFORMA',
    title: 'Onde a solução precisa estar disponível?',
    description: 'Escolha o principal canal. A arquitetura pode contemplar mais de um ambiente.',
    options: [
      ['Web', 'WEB', 'Navegador, portal, dashboard ou sistema interno'],
      ['Android', 'A', 'Aplicativo Android'],
      ['iOS', 'iOS', 'Aplicativo para iPhone e iPad'],
      ['Multiplataforma', '∞', 'Web, Android, iOS ou combinação de canais']
    ]
  },
  {
    key: 'maturity',
    eyebrow: '4. ESTÁGIO',
    title: 'Em qual nível o projeto está?',
    description: 'Assim conseguimos sugerir um próximo passo compatível com o que já existe.',
    options: [
      ['Tenho apenas a ideia', '◌', 'Ainda não existe descritivo ou arquitetura definida'],
      ['Já possuo descritivo', '✓', 'Escopo inicial pronto e preciso estruturar orçamento e execução'],
      ['O desenvolvimento já começou', '⌁', 'Preciso de co-desenvolvimento, reforço ou correção de rota'],
      ['Já está em produção', '↻', 'Quero modernizar, escalar, integrar ou evoluir o produto']
    ]
  },
  {
    key: 'priority',
    eyebrow: '5. PRIORIDADE',
    title: 'Quando você gostaria de começar?',
    description: 'Não é um compromisso. Serve apenas para entendermos a urgência e a melhor abordagem.',
    options: [
      ['Imediatamente', '01', 'Quero iniciar assim que houver alinhamento'],
      ['Em 1 a 3 meses', '03', 'Tenho uma janela próxima de execução'],
      ['Em 3 a 6 meses', '06', 'Estou planejando orçamento e escopo'],
      ['Estou pesquisando', '…', 'Quero entender possibilidades antes de decidir']
    ]
  }
];

export default function ContactForm() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const totalSteps = 6;
  const isFinalStep = step === totalSteps - 1;
  const progress = Math.round(((step + 1) / totalSteps) * 100);

  function choose(key, value) {
    setAnswers((current) => ({ ...current, [key]: value }));
    setStep((current) => Math.min(current + 1, totalSteps - 1));
  }

  function goBack() {
    if (step === 0) {
      setStarted(false);
      return;
    }
    setStep((current) => Math.max(0, current - 1));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setStatus('sending');
    setMessage('');

    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form));
    const diagnostic = [
      `Tipo de projeto: ${raw.projectType || answers.projectType || 'Não informado'}`,
      `Integrações: ${answers.integration || 'Não informado'}`,
      `Plataforma: ${answers.platform || 'Não informado'}`,
      `Estágio: ${answers.maturity || 'Não informado'}`,
      `Prioridade: ${answers.priority || raw.deadline || 'Não informado'}`,
      `Telefone: ${raw.phone || 'Não informado'}`,
      `Tamanho da empresa: ${raw.employees || 'Não informado'}`,
      '',
      `Detalhes adicionais: ${raw.details || 'Não informado'}`
    ].join('\n');

    const data = {
      name: raw.name,
      email: raw.email,
      company: raw.company,
      projectType: raw.projectType || answers.projectType || 'Outro',
      message: diagnostic,
      website: raw.website
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Erro ao enviar');
      form.reset();
      setStatus('success');
      setMessage('Recebemos seu diagnóstico. A equipe vai analisar o contexto e seguir a conversa.');
    } catch (error) {
      setStatus('error');
      setMessage(error.message || 'Não foi possível enviar agora.');
    }
  }

  if (!started) {
    return (
      <div className="diagnosticStart">
        <div className="diagnosticStartMark">AC</div>
        <span className="kicker">DIAGNÓSTICO DE PROJETO</span>
        <h3>Deixe a gente entender o que você precisa.</h3>
        <p>São poucas perguntas para organizarmos o contexto antes da conversa. Leva menos de dois minutos.</p>
        <button className="button diagnosticPrimary" type="button" onClick={() => setStarted(true)}>
          Iniciar diagnóstico <span>→</span>
        </button>
        <button className="diagnosticSkip" type="button" onClick={() => { setStarted(true); setStep(totalSteps - 1); }}>
          Prefiro ir direto ao contato
        </button>
      </div>
    );
  }

  return (
    <div className="diagnosticShell">
      <div className="diagnosticTopbar">
        <button className="diagnosticBack" type="button" onClick={goBack}>← Voltar</button>
        <div className="diagnosticProgressCopy">
          <span>Pergunta {step + 1} de {totalSteps}</span>
          <strong>{progress}%</strong>
        </div>
      </div>

      <div className="diagnosticProgress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
      <div className="diagnosticDots" aria-hidden="true">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <i className={index <= step ? 'active' : ''} key={index} />
        ))}
      </div>

      {!isFinalStep ? (
        <div className="diagnosticQuestion">
          <span className="kicker">{steps[step].eyebrow}</span>
          <h3>{steps[step].title}</h3>
          <p>{steps[step].description}</p>
          <div className="diagnosticOptions">
            {steps[step].options.map(([label, icon, description]) => (
              <button
                type="button"
                className="diagnosticOption"
                key={label}
                onClick={() => choose(steps[step].key, label)}
              >
                <span className="diagnosticIcon">{icon}</span>
                <span><strong>{label}</strong><small>{description}</small></span>
                <b>→</b>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <form className="contactForm diagnosticForm" onSubmit={onSubmit}>
          <div className="diagnosticQuestion finalQuestion">
            <span className="kicker">6. CONTATO</span>
            <h3>Quase lá. Agora precisamos falar com você.</h3>
            <p>Os dados abaixo serão usados somente para responder sobre este projeto.</p>
          </div>

          <input className="hp" name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" />

          <div className="formRow">
            <label>Nome completo<input name="name" required maxLength="100" placeholder="Seu nome" /></label>
            <label>E-mail<input name="email" type="email" required maxLength="160" placeholder="voce@empresa.com" /></label>
          </div>

          <div className="formRow">
            <label>Telefone<input name="phone" maxLength="40" placeholder="(00) 00000-0000" /></label>
            <label>Empresa<input name="company" maxLength="140" placeholder="Nome da empresa" /></label>
          </div>

          <div className="formRow">
            <label>Tipo de projeto
              <select name="projectType" defaultValue={answers.projectType || ''}>
                <option value="" disabled>Selecione</option>
                <option>Software sob medida</option>
                <option>MVP / Produto digital</option>
                <option>IA / Automação</option>
                <option>Evolução / Sustentação</option>
                <option>Integração / API</option>
                <option>Modernização</option>
                <option>Outro</option>
              </select>
            </label>
            <label>Número de colaboradores
              <select name="employees" defaultValue="">
                <option value="">Opcional</option>
                <option>1–10</option>
                <option>11–50</option>
                <option>51–100</option>
                <option>Acima de 100</option>
              </select>
            </label>
          </div>

          <label>Prazo desejado
            <select name="deadline" defaultValue={answers.priority || ''}>
              <option value="">Opcional</option>
              <option>Imediatamente</option>
              <option>Em 1 a 3 meses</option>
              <option>Em 3 a 6 meses</option>
              <option>Estou pesquisando</option>
            </select>
          </label>

          <label>Conte mais sobre seu projeto
            <textarea name="details" maxLength="2200" rows="5" placeholder="Objetivo, cenário atual, principais dificuldades ou qualquer informação que ajude a entender o contexto." />
          </label>

          <button className="button diagnosticSubmit" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Enviando...' : 'Enviar diagnóstico →'}
          </button>
          <p className="privacyNote">Ao enviar, você autoriza a A Castilho a usar estes dados apenas para responder ao seu contato.</p>
          {message && <p className={`formStatus ${status}`} role="status">{message}</p>}
        </form>
      )}
    </div>
  );
}
