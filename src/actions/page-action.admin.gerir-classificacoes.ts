import { withDb } from '@/lib/prisma'
import { RespostaPadrao } from '@/types/api'

export async function buscarClassificacoes(): Promise<RespostaPadrao> {
    return await withDb(async (prisma) => {
        try {
            const classificacoes = await prisma.classificacao.findMany({
                where: { deletadoEm: null },
                orderBy: { nome: 'asc' },
            })
            return { sucesso: true, mensagem: 'Classificações recuperadas com sucesso', dados: classificacoes }
        } catch (erro) {
            return { sucesso: false, mensagem: 'Erro ao buscar classificações' }
        }
    })
}

export async function adicionarClassificacao(nome: string): Promise<RespostaPadrao> {
    return await withDb(async (prisma) => {
        try {
            // Check if there's a soft-deleted entry with the same name — restore it instead of creating duplicate
            const existing = await prisma.classificacao.findFirst({
                where: { nome },
            })
            if (existing) {
                if (existing.deletadoEm !== null) {
                    // Restore the soft-deleted record
                    await prisma.classificacao.update({
                        where: { id: existing.id },
                        data: { deletadoEm: null },
                    })
                    return { sucesso: true, mensagem: 'Classificação restaurada com sucesso' }
                }
                return { sucesso: false, mensagem: 'Classificação já existe' }
            }
            await prisma.classificacao.create({ data: { nome } })
            return { sucesso: true, mensagem: 'Classificação adicionada com sucesso' }
        } catch (erro) {
            return { sucesso: false, mensagem: 'Erro ao adicionar classificação' }
        }
    })
}

export async function excluirClassificacao(id: string): Promise<RespostaPadrao> {
    return await withDb(async (prisma) => {
        try {
            await prisma.classificacao.update({
                where: { id },
                data: { deletadoEm: new Date() },
            })
            return { sucesso: true, mensagem: 'Classificação excluída com sucesso' }
        } catch (erro) {
            return { sucesso: false, mensagem: 'Erro ao excluir classificação' }
        }
    })
}
