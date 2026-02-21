import { RespostaPadrao } from '@/types/api'
import { adicionarRelatorio } from '@/actions'
import { SchemaRelatorio } from '@/shemas/relatorios'

export async function POST(request: Request) {
    try {
        const corpo = await request.json()
        const validacao = SchemaRelatorio.safeParse(corpo)

        if (!validacao.success) {
            return Response.json(
                {
                    sucesso: false,
                    mensagem: 'Dados inválidos',
                    erros: validacao.error.issues.map((e) => ({
                        campo: e.path.join('.'),
                        mensagem: e.message,
                    })),
                },
                { status: 400 },
            )
        }

        const resultado = await adicionarRelatorio(validacao.data)
        return Response.json(resultado)
    } catch (erro) {
        return Response.json({ sucesso: false, mensagem: 'Erro interno no servidor' }, { status: 500 })
    }
}
