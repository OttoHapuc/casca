export type TipoHero = {
  badge: string
  titulo: string
  subtitulo: string
  imagemFundo?: string
}

export type TipoSobre = {
  titulo: string
  paragrafos: string[]
  pilares: Array<{
    titulo: string
    desc: string
    imagem?: string
  }>
  imagemDestaque?: string
}

export type TipoAtividade = {
  id: string
  ordem: string
  titulo: string
  descricao: string
  imagem?: string
}

export type TipoProjeto = {
  id: string
  titulo: string
  detalhes: string
  parceiros: string
  resultados: string
  imagem?: string
}

export type TipoContato = {
  badge: string
  titulo: string
  descricao: string
  email: string
  endereco: string
  imagemFundo?: string
}

export type TipoConteudoHome = {
  hero: TipoHero
  sobre: TipoSobre
  atividades: {
    titulo: string
    descricao: string
    lista: TipoAtividade[]
    imagemFundo?: string
  }
  projetos: {
    titulo: string
    descricao: string
    lista: TipoProjeto[]
    imagemFundo?: string
  }
  contato: TipoContato
}
