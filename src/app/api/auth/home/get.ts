import { buscarConteudoHome } from '@/actions/page-action.home.buscar-conteudo'
import { RespostaPadrao } from '@/types/api'

export async function GET() {
  const dados = await buscarConteudoHome()
  const resposta: RespostaPadrao = {
    sucesso: true,
    mensagem: 'Dados recuperados com sucesso',
    dados,
  }
  return Response.json(resposta)
}
