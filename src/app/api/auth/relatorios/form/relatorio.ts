export const FormularioRelatorio = {
  titulo: {
    label: 'Título do Relatório',
    placeholder: 'Ex: Balanço Anual 2024',
    tipo: 'text',
  },
  data: {
    label: 'Data de Referência',
    placeholder: 'AAAA-MM-DD',
    tipo: 'date',
  },
  categoria: {
    label: 'Categoria',
    placeholder: 'Selecione a categoria',
    tipo: 'select',
    opcoes: [
      { valor: 'Prestação de Contas', rotulo: 'Prestação de Contas' },
      { valor: 'Certificações', rotulo: 'Certificações' },
      { valor: 'Editais', rotulo: 'Editais' },
    ],
  },
  arquivoUrl: {
    label: 'URL do Arquivo (PDF)',
    placeholder: 'https://...',
    tipo: 'url',
  },
}
