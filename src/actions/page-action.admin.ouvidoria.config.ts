import { RespostaPadrao } from '@/types/api'
import { withDb } from '@/lib/prisma'
import { TipoOuvidoriaConfig, ouvidoriaConfigPadrao } from '@/types/app/ouvidoria'

type DadosConteudoOuvidoria = {
  ouvidoriaConfig?: TipoOuvidoriaConfig
} & Record<string, unknown>

export async function buscarOuvidoriaConfigAdmin(): Promise<TipoOuvidoriaConfig> {
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

export async function salvarOuvidoriaConfig(config: TipoOuvidoriaConfig): Promise<RespostaPadrao> {
  return await withDb(async (prisma) => {
    try {
      const conteudo = await prisma.conteudo.findUnique({
        where: { slug: 'principal' },
      })

      const dadosAtuais: DadosConteudoOuvidoria =
        (conteudo && (conteudo.dados as DadosConteudoOuvidoria)) || {}
      const dadosAtualizados: DadosConteudoOuvidoria = {
        ...dadosAtuais,
        ouvidoriaConfig: config,
      }

      await prisma.conteudo.upsert({
        where: { slug: 'principal' },
        update: { dados: dadosAtualizados as any },
        create: { slug: 'principal', dados: dadosAtualizados as any },
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
