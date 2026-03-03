import { NextResponse } from 'next/server'
import { buscarOuvidoriaConfigAdmin } from '@/actions'
import { withDb } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const config = await buscarOuvidoriaConfigAdmin()
    const URL_SCRIPT = config.planilhaUrl

    if (!URL_SCRIPT) {
      return NextResponse.json(
        { sucesso: false, mensagem: 'A URL da planilha destino não foi configurada pela administração.' },
        { status: 500 }
      )
    }

    const corpo = await request.json()

    // Salvar no banco de dados
    await withDb(async (prisma) => {
      await prisma.manifestacaoOuvidoria.create({
        data: {
          anonimo: corpo.anonimo === 'sim' || corpo.anonimo === true,
          nome: corpo.nome || null,
          tipo: corpo.tipo || 'Não informado',
          cidadeServico: corpo.cidadeServico || 'Não informado',
          dataOcorrido: corpo.dataOcorrido || null,
          descricao: corpo.descricao || '',
          persiste: corpo.persiste || null,
          desejaRetorno: corpo.desejaRetorno === 'sim' || corpo.desejaRetorno === true,
          meioContato: corpo.meioContato || null,
        },
      })
    })

    const resposta = await fetch(URL_SCRIPT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(corpo),
    })

    if (!resposta.ok) {
      const texto = await resposta.text().catch(() => '')
      return NextResponse.json(
        {
          sucesso: false,
          mensagem: 'Erro ao enviar manifestação para a Ouvidoria.',
          detalhe: texto || `Status ${resposta.status}`,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      sucesso: true,
      mensagem: 'Manifestação enviada com sucesso.',
    })
  } catch (erro) {
    console.error('Erro inesperado ao enviar manifestação:', erro)
    return NextResponse.json(
      {
        sucesso: false,
        mensagem: 'Erro inesperado ao enviar manifestação.',
      },
      { status: 500 },
    )
  }
}
