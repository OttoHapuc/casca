import { RespostaPadrao } from '@/types/api'
import { buscarRelatorios } from '@/actions'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const relatorios = await buscarRelatorios()
        return NextResponse.json<RespostaPadrao>({
            sucesso: true,
            mensagem: 'Relatórios recuperados com sucesso',
            dados: relatorios,
        })
    } catch (erro) {
        return NextResponse.json<RespostaPadrao>(
            {
                sucesso: false,
                mensagem: 'Erro ao buscar relatórios',
                erros: [{ mensagem: erro instanceof Error ? erro.message : 'Erro desconhecido' }],
            },
            { status: 500 }
        )
    }
}
