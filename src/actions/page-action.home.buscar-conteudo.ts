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

    // Se não existir, retornamos um mock inicial para não quebrar a tela
    if (!conteudo) return null

    return conteudo.dados as unknown as TipoConteudoHome
  })
}
