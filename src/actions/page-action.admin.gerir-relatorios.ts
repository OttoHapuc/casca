import { RespostaPadrao } from '@/types/api'
import { withDb } from '@/lib/prisma'
import { TipoRelatorioInput } from '@/shemas/relatorios'

export async function adicionarRelatorio(dados: TipoRelatorioInput): Promise<RespostaPadrao> {
  return await withDb(async (prisma) => {
    try {
      await prisma.relatorio.create({
        data: {
          titulo: dados.titulo,
          data: new Date(dados.data),
          categoria: dados.categoria,
          arquivoUrl: dados.arquivoUrl,
        },
      })
      return { sucesso: true, mensagem: 'Relatório adicionado com sucesso' }
    } catch (erro) {
      return { sucesso: false, mensagem: 'Erro ao adicionar relatório' }
    }
  })
}

export async function excluirRelatorio(id: string): Promise<RespostaPadrao> {
  return await withDb(async (prisma) => {
    try {
      await prisma.relatorio.delete({ where: { id } })
      return { sucesso: true, mensagem: 'Relatório excluído com sucesso' }
    } catch (erro) {
      return { sucesso: false, mensagem: 'Erro ao excluir relatório' }
    }
  })
}
