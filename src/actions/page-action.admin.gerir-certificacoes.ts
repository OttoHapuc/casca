import { withDb } from '@/lib/prisma'
import { RespostaPadrao } from '@/types/api'

export async function buscarCertificacoes(): Promise<RespostaPadrao> {
    return await withDb(async (prisma) => {
        try {
            const certificacoes = await prisma.certificacao.findMany({
                where: { deletadoEm: null },
                orderBy: { criadoEm: 'asc' },
            })
            return { sucesso: true, mensagem: 'Certificações recuperadas com sucesso', dados: certificacoes }
        } catch (erro) {
            return { sucesso: false, mensagem: 'Erro ao buscar certificações' }
        }
    })
}

export async function adicionarCertificacao(dados: { titulo: string; imagemUrl: string }): Promise<RespostaPadrao> {
    return await withDb(async (prisma) => {
        try {
            await prisma.certificacao.create({ data: dados })
            return { sucesso: true, mensagem: 'Certificação adicionada com sucesso' }
        } catch (erro) {
            return { sucesso: false, mensagem: 'Erro ao adicionar certificação' }
        }
    })
}

export async function excluirCertificacao(id: string): Promise<RespostaPadrao> {
    return await withDb(async (prisma) => {
        try {
            await prisma.certificacao.update({
                where: { id },
                data: { deletadoEm: new Date() },
            })
            return { sucesso: true, mensagem: 'Certificação excluída com sucesso' }
        } catch (erro) {
            return { sucesso: false, mensagem: 'Erro ao excluir certificação' }
        }
    })
}
