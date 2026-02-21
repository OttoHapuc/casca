import { z } from 'zod'

export const SchemaHero = z.object({
  badge: z.string().min(1, 'Slogan é obrigatório'),
  titulo: z.string().min(1, 'Título é obrigatório'),
  subtitulo: z.string().min(1, 'Subtítulo é obrigatório'),
})

export const SchemaSobre = z.object({
  titulo: z.string().min(1, 'Título é obrigatório'),
  paragrafos: z.array(z.string()),
  pilares: z.array(
    z.object({
      titulo: z.string(),
      desc: z.string(),
    }),
  ),
})
