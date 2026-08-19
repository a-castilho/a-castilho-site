# Validação — Central de Relatórios de Homologação

## Estado técnico

- [x] item **Relatórios** na navegação de homologação
- [x] rota `/homologacao/relatorios`
- [x] leitura por categorias e busca
- [x] botão **Copiar para conversa**
- [x] atalho **Nova ideia**
- [x] projeção pública reduzida por allowlist
- [x] sanitização reforçada para superfície pública
- [ ] evidência visual da tela em homologação
- [ ] comparação final entre comportamento esperado e tela implantada

Os checks de build, Render e smoke do commit atual incluem resultados verdes, mas `acs/develop` está falhando; a tela não deve ser marcada como visualmente homologada antes de revisão desse status e registro de evidência visual.
