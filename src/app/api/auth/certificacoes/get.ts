import { NextResponse } from 'next/server'
import { RespostaPadrao } from '@/types/api'
import { buscarCertificacoes } from '@/actions'

export async function GET() {
    try {
        const resultado = await buscarCertificacoes()
        return NextResponse.json<RespostaPadrao>(resultado)
    } catch (erro) {
        return NextResponse.json<RespostaPadrao>(
            { sucesso: false, mensagem: 'Erro ao buscar certificações' },
            { status: 500 },
        )
    }
}
