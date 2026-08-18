import { getDatabaseClient, getDatabaseUrl } from '../../../lib/database';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  const startedAt = Date.now();
  const databaseUrl = getDatabaseUrl();

  if (!databaseUrl) {
    return Response.json(
      { ok: false, service: 'a-castilho-site', database: 'not-configured' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  try {
    const sql = getDatabaseClient();
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
