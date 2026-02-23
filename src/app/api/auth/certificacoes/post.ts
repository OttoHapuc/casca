import { adicionarCertificacao } from '@/actions'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const corpo = await request.json()
        const { titulo, imagemUrl } = corpo

        if (!titulo || !imagemUrl) {
            return NextResponse.json(
                { sucesso: false, mensagem: 'Título e URL da imagem são obrigatórios' },
                { status: 400 },
            )
        }

        const resultado = await adicionarCertificacao({ titulo, imagemUrl })
        return NextResponse.json(resultado)
    } catch (erro) {
        return NextResponse.json({ sucesso: false, mensagem: 'Erro interno no servidor' }, { status: 500 })
    }
}
