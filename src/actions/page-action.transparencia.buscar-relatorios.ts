import { withDb } from '@/lib/prisma'
import { TipoRelatorio } from '@/types/app/transparencia'

export async function buscarRelatorios(): Promise<TipoRelatorio[]> {
  return await withDb(async (prisma) => {
    const relatorios = await prisma.relatorio.findMany({
      orderBy: { data: 'desc' },
    })

    return relatorios.map((r: any) => ({
      id: r.id,
      titulo: r.titulo,
      data: r.data.toISOString().split('T')[0],
      categoria: r.categoria,
      arquivoUrl: r.arquivoUrl,
    }))
  })
}
