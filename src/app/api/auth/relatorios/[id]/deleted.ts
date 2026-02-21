import { NextRequest, NextResponse } from 'next/server'
import { RespostaPadrao } from '@/types/api'
import { excluirRelatorio } from '@/actions'

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params
        const resultado = await excluirRelatorio(id)
        return NextResponse.json(resultado)
    } catch (erro) {
        return NextResponse.json(
            { sucesso: false, mensagem: 'Erro interno no servidor' },
            { status: 500 }
        )
    }
}
