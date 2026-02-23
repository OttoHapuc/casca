import { NextResponse } from 'next/server'
import { RespostaPadrao } from '@/types/api'
import { buscarClassificacoes, adicionarClassificacao, excluirClassificacao } from '@/actions'

export async function GET() {
    try {
        const resultado = await buscarClassificacoes()
        return NextResponse.json<RespostaPadrao>(resultado)
    } catch (erro) {
        return NextResponse.json<RespostaPadrao>({ sucesso: false, mensagem: 'Erro ao buscar classificações' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const { nome } = await request.json()
        if (!nome) return NextResponse.json({ sucesso: false, mensagem: 'Nome é obrigatório' }, { status: 400 })
        const resultado = await adicionarClassificacao(nome)
        return NextResponse.json(resultado)
    } catch (erro) {
        return NextResponse.json({ sucesso: false, mensagem: 'Erro interno' }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        if (!id) return NextResponse.json({ sucesso: false, mensagem: 'ID não fornecido' }, { status: 400 })
        const resultado = await excluirClassificacao(id)
        return NextResponse.json<RespostaPadrao>(resultado)
    } catch (erro) {
        return NextResponse.json<RespostaPadrao>({ sucesso: false, mensagem: 'Erro ao excluir' }, { status: 500 })
    }
}
