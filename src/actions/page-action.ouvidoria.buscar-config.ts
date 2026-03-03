import { withDb } from '@/lib/prisma'
import { TipoOuvidoriaConfig, ouvidoriaConfigPadrao } from '@/types/app/ouvidoria'

export async function buscarOuvidoriaConfig(): Promise<TipoOuvidoriaConfig> {
  return await withDb(async (prisma) => {
    const ouvidoriaDb = await prisma.ouvidoria.findUnique({
      where: { id: 1 },
    })

    if (!ouvidoriaDb) {
      const { planilhaUrl, ...configPadraoLimpa } = ouvidoriaConfigPadrao
      return configPadraoLimpa as TipoOuvidoriaConfig
    }

    const { campos, tipo, meioContato } = ouvidoriaDb
    const parsedCampos = typeof campos === 'object' && campos !== null ? campos : {}
    const parsedTipo = typeof tipo === 'object' && tipo !== null ? tipo : {}
    const parsedMeioContato = typeof meioContato === 'object' && meioContato !== null ? meioContato : {}

    const config: TipoOuvidoriaConfig = {
      fields: {
        ...ouvidoriaConfigPadrao.fields,
        ...(parsedCampos as any),
        tipo: {
          ...ouvidoriaConfigPadrao.fields.tipo,
          ...(parsedTipo as any),
        },
        meioContato: {
          ...ouvidoriaConfigPadrao.fields.meioContato,
          ...(parsedMeioContato as any),
        },
      },
    }

    return config
  })
}
