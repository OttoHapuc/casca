export type TipoAnexo = {
    id: string
    titulo: string
    arquivoUrl: string
    classificacao: string
    cidadeId: string
    criadoEm?: string | Date
}

export type TipoCidade = {
    id: string
    nome: string
    criadoEm?: string | Date
    anexos: TipoAnexo[]
}
