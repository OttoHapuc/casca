import { NextResponse } from 'next/server'
import { RespostaPadrao } from '@/types/api'
import { buscarCidades } from '@/actions'

export async function GET() {
    try {
        const resultado = await buscarCidades()
        return NextResponse.json<RespostaPadrao>(resultado)
    } catch (erro) {
        return NextResponse.json<RespostaPadrao>(
            { sucesso: false, mensagem: 'Erro ao buscar anexos' },
            { status: 500 },
        )
    }
}
