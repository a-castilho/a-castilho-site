import { neon } from '@neondatabase/serverless';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  const startedAt = Date.now();

  if (!process.env.DATABASE_URL) {
    return Response.json(
      { ok: false, service: 'a-castilho-site', database: 'not-configured' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    await sql`select 1 as ok`;

    return Response.json(
      {
        ok: true,
        service: 'a-castilho-site',
        database: 'connected',
        latencyMs: Date.now() - startedAt
      },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    console.error('health check error', error);
    return Response.json(
      { ok: false, service: 'a-castilho-site', database: 'unavailable' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
