'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(event) {
    event.preventDefault();
    setStatus('sending');
    setMessage('');
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

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
      setMessage('Mensagem recebida. Vamos avaliar o contexto e seguir a conversa.');
    } catch (error) {
      setStatus('error');
      setMessage(error.message || 'Não foi possível enviar agora.');
    }
  }

  return (
    <form className="contactForm" onSubmit={onSubmit}>
      <input className="hp" name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" />
      <div className="formRow">
        <label>Nome<input name="name" required maxLength="100" placeholder="Seu nome" /></label>
        <label>E-mail<input name="email" type="email" required maxLength="160" placeholder="voce@empresa.com" /></label>
      </div>
      <div className="formRow">
        <label>Empresa<input name="company" maxLength="140" placeholder="Nome da empresa" /></label>
        <label>Tipo de projeto
          <select name="projectType" defaultValue="">
            <option value="" disabled>Selecione</option>
            <option>Software sob medida</option>
            <option>Integração / API</option>
            <option>IA / Automação</option>
            <option>Modernização</option>
            <option>MVP / Produto digital</option>
            <option>Evolução / Sustentação</option>
            <option>Outro</option>
          </select>
        </label>
      </div>
      <label>Desafio<textarea name="message" required maxLength="3000" rows="5" placeholder="Conte brevemente o problema, o contexto e o que você gostaria de melhorar." /></label>
      <button className="button" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Enviando...' : 'Falar sobre meu projeto ↗'}
      </button>
      <p className="privacyNote">Ao enviar, você autoriza a A Castilho a usar estes dados apenas para responder ao seu contato.</p>
      {message && <p className={`formStatus ${status}`} role="status">{message}</p>}
    </form>
  );
}
