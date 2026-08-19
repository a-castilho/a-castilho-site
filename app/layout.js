import './globals.css';
import './brand.css';
import './diagnostic.css';
import './windows-theme.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://acastilho.com.br';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ACS | Software, Produto e IA',
    template: '%s | ACS'
  },
  description: 'Desenvolvimento de software sob medida, integrações, produtos digitais e soluções com IA para transformar desafios de negócio em tecnologia robusta e evolutiva.',
  keywords: ['desenvolvimento de software', 'software sob medida', 'software house', 'inteligência artificial', 'integração de sistemas', 'Next.js', 'automação'],
  icons: {
    icon: '/logo-acastilho.svg',
    shortcut: '/logo-acastilho.svg',
    apple: '/logo-acastilho.svg'
  },
  openGraph: {
    title: 'ACS | Software, Produto e IA',
    description: 'Tecnologia construída para resolver problemas reais.',
    url: siteUrl,
    siteName: 'ACS',
    locale: 'pt_BR',
    type: 'website'
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ACS',
    url: siteUrl,
    logo: `${siteUrl}/logo-acastilho.svg`,
    description: 'Empresa de desenvolvimento de software, produtos digitais, integrações e soluções com inteligência artificial.'
  };

  return (
    <html lang="pt-BR">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
