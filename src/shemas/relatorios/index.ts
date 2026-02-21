import { z } from 'zod'

export const SchemaRelatorio = z.object({
  titulo: z.string().min(3, 'O título deve ter pelo menos 3 caracteres'),
  data: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Data inválida',
  }),
  categoria: z.string().min(1, 'Selecione uma categoria'),
  arquivoUrl: z.string().url('URL de arquivo inválida'),
})

export type TipoRelatorioInput = z.infer<typeof SchemaRelatorio>
