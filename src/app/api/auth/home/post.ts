import { RespostaPadrao } from '@/types/api'
import { salvarConteudoHome } from '@/actions'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const dados = await request.json()
        const res = await salvarConteudoHome(dados)

        return NextResponse.json<RespostaPadrao>({
            sucesso: res.sucesso,
            mensagem: res.mensagem,
            dados: res,
        })
    } catch (erro) {
        return NextResponse.json<RespostaPadrao>(
            {
                sucesso: false,
                mensagem: 'Erro ao atualizar conteúdo',
                erros: [{ mensagem: erro instanceof Error ? erro.message : 'Erro desconhecido' }],
            },
            { status: 500 }
        )
    }
}
