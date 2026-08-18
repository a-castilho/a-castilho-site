'use client';

import { useEffect, useMemo, useState } from 'react';
import './painel-cliente.css';

const initialTickets = [
  {
    id: 'AC-1024',
    assunto: 'Acesso ao ambiente de homologação',
    departamento: 'Suporte técnico',
    status: 'Em andamento',
    updatedAt: 'Hoje, 10:42'
  },
  {
    id: 'AC-1018',
    assunto: 'Dúvida sobre integração',
    departamento: 'Projetos',
    status: 'Respondido',
    updatedAt: 'Ontem, 16:18'
  }
];

function statusClass(status) {
  return status.toLowerCase().replaceAll(' ', '-');
}

export default function PainelCliente() {
  const [view, setView] = useState('inicio');
  const [tickets, setTickets] = useState(initialTickets);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem('acastilho-client-tickets');
    if (stored) {
      try {
        setTickets(JSON.parse(stored));
      } catch {
        window.localStorage.removeItem('acastilho-client-tickets');
      }
    }
  }, []);

  const openCount = useMemo(
    () => tickets.filter((ticket) => ticket.status !== 'Concluído').length,
    [tickets]
  );

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = String(data.get('assunto') || '').trim();
    if (!subject) return;

    const newTicket = {
      id: `AC-${String(Date.now()).slice(-6)}`,
      assunto: subject,
      departamento: String(data.get('departamento') || 'Suporte técnico'),
      status: 'Aberto',
      updatedAt: 'Agora'
    };

    const nextTickets = [newTicket, ...tickets];
    setTickets(nextTickets);
    window.localStorage.setItem('acastilho-client-tickets', JSON.stringify(nextTickets));
    event.currentTarget.reset();
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 3500);
  }

  return (
    <main className="clientShell">
      <header className="clientTopbar">
        <a className="clientBrand" href="/" aria-label="Voltar ao site A Castilho">
          <span className="clientBrandMark">AC</span>
          <span>
            <strong>A Castilho</strong>
            <small>Painel do Cliente</small>
          </span>
        </a>
        <div className="clientTopActions">
          <span className="serviceStatus"><i /> Atendimento online</span>
          <a className="backSite" href="/">Voltar ao site</a>
        </div>
      </header>

      <section className="clientHero">
        <div>
          <span className="clientKicker">CENTRAL DE ATENDIMENTO</span>
          <h1>Olá, como podemos ajudar?</h1>
          <p>Abra solicitações, acompanhe seus chamados e encontre rapidamente o que precisa para seguir com seu projeto.</p>
        </div>
        <div className="heroStats" aria-label="Resumo do atendimento">
          <div><span>Chamados ativos</span><strong>{openCount}</strong></div>
          <div><span>Canal</span><strong>Portal</strong></div>
          <div><span>Prioridade</span><strong>Cliente</strong></div>
        </div>
      </section>

      <nav className="clientTabs" aria-label="Seções do painel">
        <button className={view === 'inicio' ? 'active' : ''} onClick={() => setView('inicio')}>Visão geral</button>
        <button className={view === 'novo' ? 'active' : ''} onClick={() => setView('novo')}>Novo chamado</button>
        <button className={view === 'chamados' ? 'active' : ''} onClick={() => setView('chamados')}>Meus chamados</button>
      </nav>

      <div className="clientContent">
        {view === 'inicio' && (
          <>
            <section className="actionGrid">
              <button className="actionCard primaryAction" onClick={() => setView('novo')}>
                <span className="actionIcon">＋</span>
                <span className="actionText">
                  <small>NOVA SOLICITAÇÃO</small>
                  <strong>Enviar um chamado</strong>
                  <p>Abra um novo atendimento para nossa equipe técnica ou de projetos.</p>
                </span>
                <span className="actionArrow">↗</span>
              </button>

              <button className="actionCard" onClick={() => setView('chamados')}>
                <span className="actionIcon">◎</span>
                <span className="actionText">
                  <small>ACOMPANHAMENTO</small>
                  <strong>Visualizar chamados existentes</strong>
                  <p>Acompanhe status, histórico e as solicitações enviadas anteriormente.</p>
                </span>
                <span className="actionArrow">→</span>
              </button>
            </section>

            <section className="clientColumns">
              <article className="clientPanel">
                <div className="panelHeading">
                  <div><small>ATIVIDADE RECENTE</small><h2>Últimos chamados</h2></div>
                  <button onClick={() => setView('chamados')}>Ver todos</button>
                </div>
                <div className="ticketList compact">
                  {tickets.slice(0, 3).map((ticket) => (
                    <div className="ticketRow" key={ticket.id}>
                      <div className="ticketId">{ticket.id}</div>
                      <div className="ticketMain"><strong>{ticket.assunto}</strong><span>{ticket.departamento} · {ticket.updatedAt}</span></div>
                      <span className={`ticketStatus ${statusClass(ticket.status)}`}>{ticket.status}</span>
                    </div>
                  ))}
                </div>
              </article>

              <aside className="clientPanel supportPanel">
                <small>PRECISA DE AJUDA?</small>
                <h2>Fale com a A Castilho</h2>
                <p>Para assuntos urgentes ou dúvidas antes de abrir um chamado, utilize nossos canais de atendimento.</p>
                <div className="supportItems">
                  <span><i>01</i><b>Suporte técnico</b></span>
                  <span><i>02</i><b>Projetos e evolução</b></span>
                  <span><i>03</i><b>Comercial</b></span>
                </div>
              </aside>
            </section>
          </>
        )}

        {view === 'novo' && (
          <section className="clientPanel formPanel">
            <div className="panelHeading formHeading">
              <div><small>NOVO ATENDIMENTO</small><h2>Enviar um chamado</h2><p>Descreva sua solicitação com o máximo de contexto possível.</p></div>
            </div>
            <form className="ticketForm" onSubmit={handleSubmit}>
              <div className="fieldGrid">
                <label>Departamento<select name="departamento" defaultValue="Suporte técnico"><option>Suporte técnico</option><option>Projetos</option><option>Comercial</option><option>Financeiro</option></select></label>
                <label>Prioridade<select name="prioridade" defaultValue="Normal"><option>Baixa</option><option>Normal</option><option>Alta</option><option>Urgente</option></select></label>
              </div>
              <label>Assunto<input name="assunto" required placeholder="Resumo da solicitação" /></label>
              <label>Descrição<textarea name="descricao" rows="7" required placeholder="Conte o que aconteceu, o resultado esperado e outras informações úteis." /></label>
              <label className="attachmentField">Anexos<input type="file" name="anexos" multiple /><span>Arraste arquivos ou clique para selecionar</span></label>
              <div className="formActions">
                <button type="button" className="secondaryButton" onClick={() => setView('inicio')}>Cancelar</button>
                <button type="submit" className="submitButton">Enviar chamado <span>↗</span></button>
              </div>
              {submitted && <p className="successMessage">Chamado registrado no ambiente local de teste.</p>}
            </form>
          </section>
        )}

        {view === 'chamados' && (
          <section className="clientPanel ticketsPanel">
            <div className="panelHeading">
              <div><small>HISTÓRICO</small><h2>Meus chamados</h2><p>Acompanhe todas as solicitações enviadas pelo painel.</p></div>
              <button className="newTicketButton" onClick={() => setView('novo')}>＋ Novo chamado</button>
            </div>
            <div className="ticketList">
              {tickets.map((ticket) => (
                <article className="ticketRow ticketRowFull" key={ticket.id}>
                  <div className="ticketId">{ticket.id}</div>
                  <div className="ticketMain"><strong>{ticket.assunto}</strong><span>{ticket.departamento} · atualizado {ticket.updatedAt}</span></div>
                  <span className={`ticketStatus ${statusClass(ticket.status)}`}>{ticket.status}</span>
                  <button className="ticketOpen" aria-label={`Abrir ${ticket.id}`}>→</button>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>

      <footer className="clientFooter">
        <span>© 2026 A Castilho</span>
        <span>Software • Produto • IA</span>
        <a href="/">acastilho.com.br</a>
      </footer>
    </main>
  );
}
