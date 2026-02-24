import { PrismaClient } from '@prisma/client'

const prismaGlobal = global as unknown as { prisma: PrismaClient }

export const prisma = prismaGlobal.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') prismaGlobal.prisma = prisma

/**
 * Helper para gerenciar conexão com o banco conforme Diretriz.md
 */
export async function withDb<T>(callback: (client: PrismaClient) => Promise<T>): Promise<T> {
  // Prisma gerencia o pool de conexões automaticamente.
  // Evitamos conectar e desconectar por requisição para não derrubar as requisições concorrentes.
  return await callback(prisma)
}
