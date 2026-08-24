import { neon } from '@neondatabase/serverless';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_BODY_BYTES = 20_000;

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
    const phone = clean(body.phone, 40);
    const projectType = clean(body.projectType, 80);
    const integration = clean(body.integration, 120);
    const platform = clean(body.platform, 80);
    const maturity = clean(body.maturity, 120);
    const priority = clean(body.priority, 80);
    const employees = clean(body.employees, 60);
    const deadline = clean(body.deadline, 80);
    const details = clean(body.details, 2200);
    const message = clean(body.message, 4000);

    if (!name || !email || !message) {
      return json({ ok: false, error: 'Preencha nome, e-mail e mensagem.' }, { status: 400 });
    }

    if (!emailPattern.test(email)) {
      return json({ ok: false, error: 'Informe um e-mail válido.' }, { status: 400 });
    }

    if (!process.env.DATABASE_URL) {
      return json({ ok: false, error: 'Formulário ainda não configurado no ambiente.' }, { status: 503 });
    }

    const diagnosticData = JSON.stringify({
      projectType,
      integration,
      platform,
      maturity,
      priority,
      phone,
      company,
      employees,
      deadline,
      details
    });

    const sql = neon(process.env.DATABASE_URL);
    const rows = await sql`
      insert into contact_leads (
        name,
        email,
        company,
        phone,
        project_type,
        integration,
        platform,
        maturity,
        priority,
        employees,
        deadline,
        details,
        message,
        diagnostic_data,
        source
      )
      values (
        ${name},
        ${email},
        ${company},
        ${phone},
        ${projectType},
        ${integration},
        ${platform},
        ${maturity},
        ${priority},
        ${employees},
        ${deadline},
        ${details},
        ${message},
        ${diagnosticData}::jsonb,
        'website-diagnostic'
      )
      returning id, created_at
    `;

    return json({
      ok: true,
      leadId: rows[0]?.id ? String(rows[0].id) : null,
      createdAt: rows[0]?.created_at || null
    });
  } catch (error) {
    console.error('contact form error', error);
    return json({ ok: false, error: 'Não foi possível enviar agora.' }, { status: 500 });
  }
}
