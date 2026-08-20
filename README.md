# ACS — Site Institucional

**Atualizado em: 20/08/2026**

Site institucional da ACS, desenvolvido em Next.js com foco em posicionamento comercial como parceira de software, produto e inteligência artificial.

## Stack
- Next.js 15
- React 19
- Neon Postgres
- Vercel

## Principais recursos
- Home responsiva com posicionamento comercial
- Seções de soluções, processo, impacto, princípios e FAQ
- Formulário de captação de leads com validação e honeypot anti-spam
- API Route para persistência dos contatos no Neon Postgres
- Metadados para SEO/Open Graph e dados estruturados de organização
- Estrutura preparada para Vercel

## Desenvolvimento local
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Variáveis de ambiente
- `DATABASE_URL`: string de conexão com o Neon Postgres.
- `NEXT_PUBLIC_SITE_URL`: URL pública do site.
- `CONTACT_TO_EMAIL`: reservado para futura notificação por e-mail dos leads.

## Banco de dados
A API `/api/contact` grava os contatos na tabela `contact_leads`.

## Deploy
Configure as variáveis de ambiente no projeto da Vercel antes de publicar em produção.

<!-- COMPROMISSO-GERAL-A-CASTILHO -->

---

## Compromisso Geral

**Sempre na melhor prática. No caminho do bem maior.**

**Ir até o fim sem sair do caminho, seja ele qual for.**

