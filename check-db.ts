import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const conteudos = await prisma.conteudo.findMany()
    console.log('Conteúdos no banco:', JSON.stringify(conteudos, null, 2))
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
