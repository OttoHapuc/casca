import { adicionarAnexo } from '@/actions'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const corpo = await request.json()
        const { titulo, arquivoUrl, classificacao, cidadeId } = corpo

        if (!titulo || !arquivoUrl || !classificacao || !cidadeId) {
            return NextResponse.json(
                { sucesso: false, mensagem: 'Todos os campos são obrigatórios: titulo, arquivoUrl, classificacao, cidadeId' },
                { status: 400 },
            )
        }

        const resultado = await adicionarAnexo({ titulo, arquivoUrl, classificacao, cidadeId })
        return NextResponse.json(resultado)
    } catch (erro) {
        return NextResponse.json({ sucesso: false, mensagem: 'Erro interno no servidor' }, { status: 500 })
    }
}
