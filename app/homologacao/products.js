export const homologationProducts = [
  {
    slug: 'regulaai',
    name: 'RegulaAI',
    description:
      'Plataforma de inteligência regulatória para acompanhar mudanças, classificar impactos e priorizar ações para empresas.',
    status: 'homologacao',
    statusLabel: 'Em homologação',
    updatedAt: '18/08/2026',
    publicUrl:
      process.env.NEXT_PUBLIC_REGULAAI_HOMOLOG_URL ||
      'https://regulaai.onrender.com',
    visibleToClients: true,
    highlights: ['Inteligência regulatória', 'IA aplicada', 'Monitoramento contínuo']
  }
];

export function getPublicHomologationProducts() {
  return homologationProducts.filter(
    (product) => product.visibleToClients && product.status === 'homologacao'
  );
}
