import { NextResponse } from 'next/server'

const URL_SCRIPT =
  'https://script.google.com/macros/s/AKfycbz7iyA83aoJFSh8eKaOuyS8qeMkwW3u1ioKmdcpsRVFGdpN3UD3VPJRSNrroXTgZ0NilA/exec'

export async function POST(request: Request) {
  try {
    const corpo = await request.json()

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
