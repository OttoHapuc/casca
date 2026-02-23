import { withDb } from '@/lib/prisma'
import { RespostaPadrao } from '@/types/api'

// ── Cidades ────────────────────────────────────────────────────────────────

export async function buscarCidades(): Promise<RespostaPadrao> {
    return await withDb(async (prisma) => {
        try {
            const cidades = await prisma.cidade.findMany({
                where: { deletadoEm: null },
                orderBy: { nome: 'asc' },
                include: {
                    anexos: {
                        where: { deletadoEm: null },
                        orderBy: { criadoEm: 'desc' },
                    },
                },
            })
            return { sucesso: true, mensagem: 'Cidades recuperadas com sucesso', dados: cidades }
        } catch (erro) {
            return { sucesso: false, mensagem: 'Erro ao buscar cidades' }
        }
    })
}

export async function adicionarCidade(nome: string): Promise<RespostaPadrao> {
    return await withDb(async (prisma) => {
        try {
            await prisma.cidade.create({ data: { nome } })
            return { sucesso: true, mensagem: 'Cidade adicionada com sucesso' }
        } catch (erro) {
            return { sucesso: false, mensagem: 'Erro ao adicionar cidade' }
        }
    })
}

export async function excluirCidade(id: string): Promise<RespostaPadrao> {
    return await withDb(async (prisma) => {
        try {
            // Soft-delete the city and all its annexes
            await prisma.$transaction([
                prisma.anexo.updateMany({
                    where: { cidadeId: id, deletadoEm: null },
                    data: { deletadoEm: new Date() },
                }),
                prisma.cidade.update({
                    where: { id },
                    data: { deletadoEm: new Date() },
                }),
            ])
            return { sucesso: true, mensagem: 'Cidade excluída com sucesso' }
        } catch (erro) {
            return { sucesso: false, mensagem: 'Erro ao excluir cidade' }
        }
    })
}

// ── Anexos ─────────────────────────────────────────────────────────────────

export async function buscarAnexos(): Promise<RespostaPadrao> {
    return await withDb(async (prisma) => {
        try {
            const anexos = await prisma.anexo.findMany({
                where: { deletadoEm: null },
                orderBy: { criadoEm: 'desc' },
                include: {
                    cidade: { select: { nome: true } },
                },
            })
            return { sucesso: true, mensagem: 'Anexos recuperados com sucesso', dados: anexos }
        } catch (erro) {
            return { sucesso: false, mensagem: 'Erro ao buscar anexos' }
        }
    })
}

export async function adicionarAnexo(dados: {
    titulo: string
    arquivoUrl: string
    classificacao: string
    cidadeId: string
}): Promise<RespostaPadrao> {
    return await withDb(async (prisma) => {
        try {
            await prisma.anexo.create({ data: dados })
            return { sucesso: true, mensagem: 'Documento adicionado com sucesso' }
        } catch (erro) {
            return { sucesso: false, mensagem: 'Erro ao adicionar documento' }
        }
    })
}

export async function excluirAnexo(id: string): Promise<RespostaPadrao> {
    return await withDb(async (prisma) => {
        try {
            await prisma.anexo.update({
                where: { id },
                data: { deletadoEm: new Date() },
            })
            return { sucesso: true, mensagem: 'Documento excluído com sucesso' }
        } catch (erro) {
            return { sucesso: false, mensagem: 'Erro ao excluir documento' }
        }
    })
}
