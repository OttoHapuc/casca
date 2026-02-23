import { NextResponse } from 'next/server'
import { RespostaPadrao } from '@/types/api'
import { excluirCertificacao } from '@/actions'

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json<RespostaPadrao>({ sucesso: false, mensagem: 'ID não fornecido' }, { status: 400 })
        }

        const resultado = await excluirCertificacao(id)
        return NextResponse.json<RespostaPadrao>(resultado)
    } catch (erro) {
        return NextResponse.json<RespostaPadrao>({ sucesso: false, mensagem: 'Erro ao excluir certificação' }, { status: 500 })
    }
}
