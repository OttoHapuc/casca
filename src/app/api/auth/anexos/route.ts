import { buscarAnexos, adicionarAnexo, excluirAnexo } from '@/actions'
import { NextResponse } from 'next/server'
import { RespostaPadrao } from '@/types/api'

export async function GET() {
    try {
        const resultado = await buscarAnexos()
        return NextResponse.json<RespostaPadrao>(resultado)
    } catch (erro) {
        return NextResponse.json<RespostaPadrao>({ sucesso: false, mensagem: 'Erro ao buscar anexos' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const corpo = await request.json()
        const { titulo, arquivoUrl, classificacao, cidadeId } = corpo
        if (!titulo || !arquivoUrl || !classificacao || !cidadeId) {
            return NextResponse.json(
                { sucesso: false, mensagem: 'Todos os campos são obrigatórios' },
                { status: 400 },
            )
        }
        const resultado = await adicionarAnexo({ titulo, arquivoUrl, classificacao, cidadeId })
        return NextResponse.json(resultado)
    } catch (erro) {
        return NextResponse.json({ sucesso: false, mensagem: 'Erro interno no servidor' }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        if (!id) return NextResponse.json({ sucesso: false, mensagem: 'ID não fornecido' }, { status: 400 })
        const resultado = await excluirAnexo(id)
        return NextResponse.json<RespostaPadrao>(resultado)
    } catch (erro) {
        return NextResponse.json<RespostaPadrao>({ sucesso: false, mensagem: 'Erro ao excluir' }, { status: 500 })
    }
}
