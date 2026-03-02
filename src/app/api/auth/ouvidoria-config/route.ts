import { NextResponse } from 'next/server'
import { RespostaPadrao } from '@/types/api'
import { buscarOuvidoriaConfigAdmin, salvarOuvidoriaConfig } from '@/actions'
import { TipoOuvidoriaConfig } from '@/types/app/ouvidoria'

export async function GET() {
  try {
    const config = await buscarOuvidoriaConfigAdmin()

    return NextResponse.json<RespostaPadrao>({
      sucesso: true,
      mensagem: 'Configuração da Ouvidoria carregada com sucesso',
      dados: config,
    })
  } catch (erro) {
    console.error('Erro ao carregar configuração da Ouvidoria:', erro)
    return NextResponse.json<RespostaPadrao>(
      {
        sucesso: false,
        mensagem: 'Erro ao carregar configuração da Ouvidoria',
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const corpo = (await request.json()) as TipoOuvidoriaConfig

    if (!corpo || !corpo.fields) {
      return NextResponse.json<RespostaPadrao>(
        {
          sucesso: false,
          mensagem: 'Configuração inválida',
        },
        { status: 400 },
      )
    }

    const resultado = await salvarOuvidoriaConfig(corpo)
    return NextResponse.json<RespostaPadrao>(resultado)
  } catch (erro) {
    console.error('Erro ao salvar configuração da Ouvidoria:', erro)
    return NextResponse.json<RespostaPadrao>(
      {
        sucesso: false,
        mensagem: 'Erro ao salvar configuração da Ouvidoria',
      },
      { status: 500 },
    )
  }
}
