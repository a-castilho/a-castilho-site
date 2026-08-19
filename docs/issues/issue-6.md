# Issue #6 — homologação: validar central de Relatórios na tela

> Documento gerado automaticamente. Edite a issue; este arquivo será sincronizado.

## Metadados

- **Status:** open
- **Autor:** @acastilho
- **Responsáveis:** —
- **Labels:** —
- **Atualizada em:** 2026-08-19T17:26:46Z
- **Fonte:** https://github.com/a-castilho/a-castilho-site/issues/6

## Planejado / descrição

## Objetivo
Validar no LAB ACS a nova área **Relatórios** e registrar evidência visual da experiência publicada.

## Implementado
- [x] item Relatórios na navegação de homologação
- [x] rota `/homologacao/relatorios`
- [x] leitura por categorias e busca
- [x] Copiar para conversa
- [x] atalho Nova ideia
- [x] projeção pública reduzida por allowlist
- [x] sanitização reforçada para superfície pública

## Segurança
A área pública recebe somente uma projeção deliberadamente reduzida. Padrões relacionados a credenciais, `.env`, tokens, secrets, API keys e connection strings são omitidos antes da publicação.

## Critérios pendentes
- [ ] abrir a rota em homologação real
- [ ] registrar screenshot/evidência visual desktop
- [ ] registrar screenshot/evidência visual mobile
- [ ] testar busca, categorias e cópia
- [ ] revisar o status `acs/develop` atualmente falhando
- [ ] comparar planejado x implementado x tela real

Referência: `docs/ideas/RELATORIOS_HOMOLOGACAO_VALIDACAO.md`.

## Regra de revisão

A PR deve comparar **planejado x implementado x tela/resultado real** e registrar evidência.
