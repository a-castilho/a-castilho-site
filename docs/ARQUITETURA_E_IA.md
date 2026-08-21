# ACS Site Institucional — Arquitetura, padrões e uso de IA

**Data de referência:** 21/08/2026

Este documento descreve a arquitetura efetivamente observada no repositório e diferencia o posicionamento comercial em inteligência artificial do uso de IA no runtime da aplicação.

## 1. Visão geral

O repositório implementa o site institucional da ACS, com foco em apresentação comercial, captação de leads, SEO e persistência de contatos.

A aplicação utiliza o App Router do Next.js e está preparada para publicação na Vercel.

## 2. Stack principal

- Next.js 15.5
- React 19
- React DOM 19
- `@neondatabase/serverless`
- Neon Postgres
- Vercel

## 3. Arquitetura

```text
Usuário
  ↓
Next.js / React
  ↓
Página institucional + formulário
  ↓
API Route /api/contact
  ↓
Validação + honeypot
  ↓
Neon Postgres
  ↓
contact_leads
```

O projeto utiliza uma arquitetura serverless enxuta: interface e endpoints HTTP permanecem no mesmo projeto Next.js, sem backend separado.

## 4. Estrutura funcional

Os componentes e rotas observados incluem:

- página institucional principal;
- estilos globais e de marca;
- formulário de contato;
- API de contato;
- health check;
- sitemap;
- robots;
- áreas adicionais como homologação, painel do cliente e sistemas.

## 5. Captação de leads

A rota `app/api/contact/route.js` executa o fluxo de persistência de contatos.

Principais controles:

- limite de tamanho do request;
- sanitização e truncamento de campos;
- validação de nome, e-mail e mensagem;
- regex para validação de e-mail;
- honeypot por campo `website`;
- verificação de `DATABASE_URL`;
- persistência parametrizada via cliente Neon;
- resposta `Cache-Control: no-store`.

A tabela utilizada é `contact_leads`.

## 6. Banco de dados

A integração usa `@neondatabase/serverless` e a variável:

```text
DATABASE_URL
```

O endpoint grava:

- nome;
- e-mail;
- empresa;
- tipo de projeto;
- mensagem;
- origem (`website`).

## 7. Uso de IA

### Posicionamento comercial

O site apresenta a ACS como parceira de software, produto e inteligência artificial.

### Runtime verificado

**Não foi identificada integração ativa com LLM, agente ou API de IA no runtime do site institucional analisado.**

As dependências principais não incluem SDKs de OpenAI, Anthropic, Google Gemini ou bibliotecas de embeddings/vector store.

A aplicação observada é essencialmente:

```text
Next.js + React + Neon Postgres
```

Assim, mencionar IA no conteúdo comercial não significa que o próprio site execute inferência de IA.

## 8. Agentes

Não foi observado um agente de IA atuando no runtime do site.

Qualquer agente usado no processo de desenvolvimento, CI/CD ou manutenção deve ser tratado como ferramenta de engenharia externa à aplicação, salvo quando existir integração explícita no código do produto.

## 9. RAG

**RAG não está implementado no runtime verificado.**

Não foram observados:

- embeddings;
- vector database;
- chunking de documentos;
- retrieval semântico;
- geração baseada em documentos recuperados.

## 10. Deploy e infraestrutura

O desenho é compatível com Vercel:

- frontend e API Routes no Next.js;
- banco gerenciado no Neon;
- configuração por variáveis de ambiente;
- sem necessidade de servidor de aplicação persistente próprio.

Variáveis documentadas:

- `DATABASE_URL`;
- `NEXT_PUBLIC_SITE_URL`;
- `CONTACT_TO_EMAIL`, atualmente reservado para evolução de notificação por e-mail.

## 11. Padrões técnicos relevantes

- aplicação full-stack no Next.js;
- serverless database;
- API Route pequena e especializada;
- validação no servidor;
- honeypot anti-spam;
- SQL parametrizado;
- SEO por metadados, sitemap e robots;
- separação clara entre posicionamento comercial em IA e funcionalidade técnica realmente implementada.

## 12. Resumo executivo

O site institucional possui arquitetura simples e adequada ao seu objetivo: Next.js na Vercel com Neon Postgres para captação de leads. Embora inteligência artificial faça parte da oferta e do posicionamento da ACS, não há evidência de inferência por LLM, agentes ou RAG no runtime atualmente verificado. Essa distinção deve ser preservada na documentação técnica para evitar confundir capacidade comercial da empresa com dependências técnicas do site.
