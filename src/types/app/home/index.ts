export type TipoHero = {
  badge: string
  titulo: string
  subtitulo: string
}

export type TipoSobre = {
  titulo: string
  paragrafos: string[]
  pilares: Array<{
    titulo: string
    desc: string
  }>
}

export type TipoAtividade = {
  id: string
  ordem: string
  titulo: string
  descricao: string
}

export type TipoProjeto = {
  id: string
  titulo: string
  detalhes: string
  parceiros: string
  resultados: string
}

export type TipoContato = {
  badge: string
  titulo: string
  descricao: string
  email: string
  endereco: string
}

export type TipoConteudoHome = {
  hero: TipoHero
  sobre: TipoSobre
  atividades: {
    titulo: string
    descricao: string
    lista: TipoAtividade[]
  }
  projetos: {
    titulo: string
    descricao: string
    lista: TipoProjeto[]
  }
  contato: TipoContato
}
