import ReportClient from './report-client';

export const metadata = {
  title: 'Relatórios de Homologação | ACS',
  description: 'Documentação sanitizada para revisão dos produtos e decisões em homologação.'
};

export default function ReportsPage() {
  return <ReportClient />;
}
