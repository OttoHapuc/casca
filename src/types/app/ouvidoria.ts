export type TipoOuvidoriaFieldConfig = {
  enabled: boolean
  required: boolean
  label: string
  options?: string[]
}

export type TipoOuvidoriaConfig = {
  fields: {
    anonimo: TipoOuvidoriaFieldConfig
    nome: TipoOuvidoriaFieldConfig
    tipo: TipoOuvidoriaFieldConfig
    cidadeServico: TipoOuvidoriaFieldConfig
    dataOcorrido: TipoOuvidoriaFieldConfig
    descricao: TipoOuvidoriaFieldConfig
    persiste: TipoOuvidoriaFieldConfig
    desejaRetorno: TipoOuvidoriaFieldConfig
    meioContato: TipoOuvidoriaFieldConfig
  }
}

export const ouvidoriaConfigPadrao: TipoOuvidoriaConfig = {
  fields: {
    anonimo: {
      enabled: true,
      required: true,
      label: 'Deseja se identificar?',
    },
    nome: {
      enabled: true,
      required: false,
      label: 'Nome completo',
    },
    tipo: {
      enabled: true,
      required: true,
      label: 'Tipo de manifestação',
      options: ['Reclamação', 'Sugestão', 'Elogio', 'Solicitação', 'Denúncia'],
    },
    cidadeServico: {
      enabled: true,
      required: true,
      label: 'Cidade/Serviço',
    },
    dataOcorrido: {
      enabled: true,
      required: false,
      label: 'Data do ocorrido',
    },
    descricao: {
      enabled: true,
      required: true,
      label: 'Descreva a situação',
    },
    persiste: {
      enabled: true,
      required: false,
      label: 'O problema persiste?',
    },
    desejaRetorno: {
      enabled: true,
      required: true,
      label: 'Deseja receber retorno?',
    },
    meioContato: {
      enabled: true,
      required: false,
      label: 'Meio de contato preferencial',
      options: ['E-mail', 'Telefone'],
    },
  },
}
