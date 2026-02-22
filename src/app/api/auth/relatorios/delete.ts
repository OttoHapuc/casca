import { RespostaPadrao } from '@/types/api'
import { excluirRelatorio } from '@/actions'
import { NextResponse } from 'next/server'

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json<RespostaPadrao>(
                {
                    sucesso: false,
                    mensagem: 'ID do documento não fornecido',
                },
                { status: 400 }
            )
        }

        const resultado = await excluirRelatorio(id)
        return NextResponse.json<RespostaPadrao>(resultado)
    } catch (erro) {
        return NextResponse.json<RespostaPadrao>(
            {
                sucesso: false,
                mensagem: 'Erro interno no servidor ao excluir',
                erros: [{ mensagem: erro instanceof Error ? erro.message : 'Erro desconhecido' }],
            },
            { status: 500 }
        )
    }
}
