import { withDb } from '@/lib/prisma'
import { TipoConteudoHome } from '@/types/app/home'

/**
 * Action para buscar o conteúdo da página inicial
 * Nomenclatura conforme Diretriz.md: page-action.<nome_modulo>.<nome_action>.ts
 */
export async function buscarConteudoHome(): Promise<TipoConteudoHome | null> {
  return await withDb(async (prisma) => {
    const conteudo = await prisma.conteudo.findUnique({
      where: { slug: 'principal' },
    })

    if (!conteudo || !conteudo.dados) return null

    const dados = conteudo.dados as TipoConteudoHome

    if (!dados.hero || !dados.sobre || !dados.atividades || !dados.projetos || !dados.contato) {
      return null
    }

    return dados
  })
}
