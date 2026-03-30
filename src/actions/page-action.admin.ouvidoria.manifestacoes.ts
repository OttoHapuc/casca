'use server'

import { revalidatePath } from 'next/cache'
import { withDb } from '@/lib/prisma'
import { RespostaPadrao } from '@/types/api'

export async function buscarManifestacoes(
  filtroStatus: string = 'Todos',
  pagina: number = 1,
  itensPorPagina: number = 5,
) {
  return await withDb(async (prisma) => {
    try {
      const whereClause = filtroStatus !== 'Todos' ? { status: filtroStatus } : {}

      const [itens, total] = await Promise.all([
        prisma.manifestacaoOuvidoria.findMany({
          where: whereClause,
          orderBy: { criadoEm: 'desc' },
          skip: (pagina - 1) * itensPorPagina,
          take: itensPorPagina,
        }),
        prisma.manifestacaoOuvidoria.count({
          where: whereClause,
        }),
      ])

      return { itens, total }
    } catch (erro) {
      console.error('Erro ao buscar manifestações:', erro)
      return { itens: [], total: 0 }
    }
  })
}

export async function atualizarStatusManifestacao(
  id: string,
  status: string,
  observacaoAdmin?: string,
): Promise<RespostaPadrao> {
  return await withDb(async (prisma) => {
    try {
      await prisma.manifestacaoOuvidoria.update({
        where: { id: id.toString() },
        data: {
          status: status.toString(),
          observacaoAdmin: observacaoAdmin?.toString() || null,
        },
      })

      revalidatePath('/dashboard/admin')

      return {
        sucesso: true,
        mensagem: 'Manifestação atualizada com sucesso',
      }
    } catch (erro) {
      console.error('Erro ao atualizar manifestação:', erro)
      return {
        sucesso: false,
        mensagem: 'Erro ao atualizar manifestação',
      }
    }
  })
}
