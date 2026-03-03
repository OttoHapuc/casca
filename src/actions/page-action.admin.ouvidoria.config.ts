import { RespostaPadrao } from '@/types/api'
import { withDb } from '@/lib/prisma'
import { TipoOuvidoriaConfig, ouvidoriaConfigPadrao } from '@/types/app/ouvidoria'

export async function buscarOuvidoriaConfigAdmin(): Promise<TipoOuvidoriaConfig> {
  return await withDb(async (prisma) => {
    const ouvidoriaDb = await prisma.ouvidoria.findUnique({
      where: { id: 1 },
    })

    if (!ouvidoriaDb) {
      return ouvidoriaConfigPadrao
    }

    const { campos, tipo, meioContato, planilhaUrl } = ouvidoriaDb
    const parsedCampos = typeof campos === 'object' && campos !== null ? campos : {}
    const parsedTipo = typeof tipo === 'object' && tipo !== null ? tipo : {}
    const parsedMeioContato = typeof meioContato === 'object' && meioContato !== null ? meioContato : {}

    const config: TipoOuvidoriaConfig = {
      planilhaUrl: planilhaUrl || '',
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

export async function salvarOuvidoriaConfig(config: TipoOuvidoriaConfig): Promise<RespostaPadrao> {
  return await withDb(async (prisma) => {
    try {
      const { planilhaUrl, fields } = config
      const { tipo, meioContato, ...outrosCampos } = fields

      await prisma.ouvidoria.upsert({
        where: { id: 1 },
        create: {
          id: 1,
          planilhaUrl: planilhaUrl || '',
          campos: outrosCampos as any,
          tipo: tipo as any,
          meioContato: meioContato as any,
        },
        update: {
          planilhaUrl: planilhaUrl || '',
          campos: outrosCampos as any,
          tipo: tipo as any,
          meioContato: meioContato as any,
        },
      })

      return {
        sucesso: true,
        mensagem: 'Configuração da Ouvidoria atualizada com sucesso',
      }
    } catch (erro) {
      console.error('Erro ao salvar configuração da Ouvidoria:', erro)
      return {
        sucesso: false,
        mensagem: 'Erro ao salvar configuração da Ouvidoria',
      }
    }
  })
}
