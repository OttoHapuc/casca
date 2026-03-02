import { withDb } from '@/lib/prisma'
import { TipoOuvidoriaConfig, ouvidoriaConfigPadrao } from '@/types/app/ouvidoria'

type DadosConteudoOuvidoria = {
  ouvidoriaConfig?: TipoOuvidoriaConfig
}

export async function buscarOuvidoriaConfig(): Promise<TipoOuvidoriaConfig> {
  return await withDb(async (prisma) => {
    const conteudo = await prisma.conteudo.findUnique({
      where: { slug: 'principal' },
    })

    if (!conteudo || !conteudo.dados) {
      return ouvidoriaConfigPadrao
    }

    const dados = conteudo.dados as DadosConteudoOuvidoria

    if (dados.ouvidoriaConfig) {
      return dados.ouvidoriaConfig
    }

    return ouvidoriaConfigPadrao
  })
}
