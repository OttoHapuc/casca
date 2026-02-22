import { RespostaPadrao } from '@/types/api'
import { withDb } from '@/lib/prisma'

/**
 * Action para salvar conteúdo da home via Admin
 */
export async function salvarConteudoHome(dados: any): Promise<RespostaPadrao> {
  return await withDb(async (prisma) => {
    try {
      await prisma.conteudo.upsert({
        where: { slug: 'principal' },
        update: { dados },
        create: { slug: 'principal', dados },
      })

      return { sucesso: true, mensagem: 'Conteúdo atualizado com sucesso' }
    } catch (erro) {
      console.error('ERRO AO SALVAR CONTEUDO:', erro)
      return { sucesso: false, mensagem: 'Erro ao salvar conteúdo' }
    }
  })
}
