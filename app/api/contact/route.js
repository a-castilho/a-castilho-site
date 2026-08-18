import { neon } from '@neondatabase/serverless';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_BODY_BYTES = 16_000;

function clean(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

function json(body, init = {}) {
  return Response.json(body, {
    ...init,
    headers: {
      'Cache-Control': 'no-store',
      ...(init.headers || {})
    }
  });
}

export async function POST(request) {
  try {
    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > MAX_BODY_BYTES) {
      return json({ ok: false, error: 'Conteúdo muito grande.' }, { status: 413 });
    }

    const body = await request.json();

    if (body.website) {
      return json({ ok: true });
    }

    const name = clean(body.name, 100);
    const email = clean(body.email, 160).toLowerCase();
    const company = clean(body.company, 140);
    const projectType = clean(body.projectType, 80);
    const message = clean(body.message, 3000);

    if (!name || !email || !message) {
      return json({ ok: false, error: 'Preencha nome, e-mail e mensagem.' }, { status: 400 });
    }

    if (!emailPattern.test(email)) {
      return json({ ok: false, error: 'Informe um e-mail válido.' }, { status: 400 });
    }

    if (!process.env.DATABASE_URL) {
      return json({ ok: false, error: 'Formulário ainda não configurado no ambiente.' }, { status: 503 });
    }

    const sql = neon(process.env.DATABASE_URL);
    await sql`
      insert into contact_leads (name, email, company, project_type, message, source)
      values (${name}, ${email}, ${company}, ${projectType}, ${message}, 'website')
    `;

    return json({ ok: true });
  } catch (error) {
    console.error('contact form error', error);
    return json({ ok: false, error: 'Não foi possível enviar agora.' }, { status: 500 });
  }
}
