export type RespostaPadrao<T = any> = {
  sucesso: boolean
  mensagem: string
  dados?: T
  erros?: Array<{ campo?: string; mensagem: string }>
}
