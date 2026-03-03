'use server'

import { revalidatePath } from 'next/cache'
import { withDb } from '@/lib/prisma'
import { RespostaPadrao } from '@/types/api'

export async function buscarManifestacoes() {
    return await withDb(async (prisma) => {
        try {
            const manifestacoes = await prisma.manifestacaoOuvidoria.findMany({
                orderBy: { criadoEm: 'desc' },
            })
            return manifestacoes
        } catch (erro) {
            console.error('Erro ao buscar manifestações:', erro)
            return []
        }
    })
}

export async function atualizarStatusManifestacao(
    id: String,
    status: String,
    observacaoAdmin?: String
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
