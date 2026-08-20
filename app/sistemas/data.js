export const systems = [
  {
    slug: 'regulaai',
    name: 'RegulaAI',
    eyebrow: 'Inteligência regulatória',
    title: 'RegulaAI: inteligência regulatória para empresas',
    description: 'Plataforma que coleta, organiza e analisa processos regulatórios para destacar o que pode impactar cada empresa.',
    keywords: ['inteligência regulatória', 'monitoramento regulatório', 'consultas públicas', 'compliance regulatório', 'regulação brasileira'],
    summary: 'O RegulaAI transforma publicações regulatórias em eventos estruturados e ajuda empresas a identificar quais mudanças merecem atenção.',
    benefits: [
      'Centraliza processos regulatórios de fontes oficiais.',
      'Organiza eventos por órgão, categoria e prazo.',
      'Relaciona publicações ao perfil e às áreas da empresa.',
      'Prioriza o que pode gerar impacto regulatório real.'
    ],
    faqs: [
      ['O que é inteligência regulatória?', 'É o uso organizado de dados e análise para acompanhar mudanças regulatórias, identificar impactos e apoiar decisões de compliance e negócio.'],
      ['Para que serve o RegulaAI?', 'Para reduzir o esforço de acompanhar publicações oficiais e destacar os processos regulatórios mais relevantes para cada empresa.'],
      ['O RegulaAI substitui análise jurídica?', 'Não. Ele apoia triagem, organização e priorização. A interpretação jurídica e a decisão final continuam sob responsabilidade dos profissionais da empresa.']
    ]
  },
  {
    slug: 'maquina-de-leads',
    name: 'Máquina de Leads',
    eyebrow: 'Prospecção comercial',
    title: 'Máquina de Leads: prospecção e qualificação de leads',
    description: 'Plataforma de prospecção orientada a campanhas, com descoberta, qualificação, deduplicação e acompanhamento de leads.',
    keywords: ['prospecção de leads', 'automação comercial', 'qualificação de leads', 'geração de leads B2B', 'campanhas de prospecção'],
    summary: 'A Máquina de Leads organiza a prospecção em campanhas e automatiza etapas de descoberta, normalização, pontuação e acompanhamento comercial.',
    benefits: [
      'Estrutura campanhas por nicho, região, oferta e objetivo.',
      'Descobre empresas e contatos a partir de buscas.',
      'Normaliza, pontua e deduplica leads.',
      'Mantém histórico de execuções e acompanhamento do funil.'
    ],
    faqs: [
      ['O que é uma máquina de leads?', 'É uma solução que organiza e automatiza etapas de prospecção para encontrar, qualificar e acompanhar potenciais clientes.'],
      ['A plataforma trabalha com campanhas?', 'Sim. O fluxo é orientado por campanhas com nicho, região, oferta, objetivo, estratégia e palavras-chave.'],
      ['Como são evitados leads duplicados?', 'O sistema inclui normalização e deduplicação no fluxo de descoberta e qualificação.']
    ]
  },
  {
    slug: 'instituto-tela-viva',
    name: 'Instituto Tela Viva',
    eyebrow: 'Natureza, conhecimento e IA',
    title: 'Instituto Tela Viva: conexão com a natureza e conhecimento ao vivo',
    description: 'Plataforma de transmissões ao vivo em que profissionais compartilham conhecimento, experiências e atividades ligadas à natureza com apoio de IA.',
    keywords: ['natureza e tecnologia', 'transmissões ao vivo educativas', 'aprendizado com especialistas', 'inteligência artificial e natureza', 'Instituto Tela Viva'],
    summary: 'O Instituto Tela Viva conecta pessoas, criadores e conhecimento por meio de transmissões, aulas, interação e conteúdo gravado, com foco em natureza e inteligência artificial.',
    benefits: [
      'Transmissões e aulas com profissionais e criadores.',
      'Agenda, interação, perguntas e acompanhamento de conteúdo.',
      'Biblioteca de gravações e trilhas de aprendizagem.',
      'Integra natureza, conhecimento humano e inteligência artificial.'
    ],
    faqs: [
      ['O que é o Instituto Tela Viva?', 'É uma plataforma para aprender e interagir com profissionais por meio de transmissões, aulas e conteúdos ligados à natureza e ao conhecimento humano.'],
      ['As transmissões podem ficar disponíveis depois?', 'A proposta inclui gravação e biblioteca de conteúdos para replay, conforme as regras de acesso de cada aula ou transmissão.'],
      ['Qual é o papel da inteligência artificial?', 'A IA é usada como apoio para ampliar acesso, organização e conexão entre pessoas, conhecimento e natureza.']
    ]
  }
];

export function getSystem(slug) {
  return systems.find((system) => system.slug === slug);
}
