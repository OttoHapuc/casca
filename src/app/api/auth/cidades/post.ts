import { adicionarCidade } from '@/actions'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const corpo = await request.json()
        const { nome } = corpo

        if (!nome) {
            return NextResponse.json({ sucesso: false, mensagem: 'Nome da cidade é obrigatório' }, { status: 400 })
        }

        const resultado = await adicionarCidade(nome)
        return NextResponse.json(resultado)
    } catch (erro) {
        return NextResponse.json({ sucesso: false, mensagem: 'Erro interno no servidor' }, { status: 500 })
    }
}
