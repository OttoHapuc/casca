import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const conteudoHome = {
        hero: {
            badge: 'Desde 2004 transformando vidas',
            titulo: 'CENTRO DE ATENDIMENTO SOCIAL',
            subtitulo:
                'Promovendo a inclusão e o desenvolvimento de crianças e adolescentes em situações de vulnerabilidade social em Tremembé.',
        },
        sobre: {
            titulo: 'Mais de duas décadas de compromisso social.',
            paragrafos: [
                'Fundado em 2004, o Centro de Atendimento Social à Criança e ao Adolescente (C.A.S.C.A) nasceu de uma visão compartilhada por um grupo de voluntários dedicados à causa da infância em Tremembé/SP.',
                'Nossa missão é acolher e oferecer oportunidades de desenvolvimento integral, garantindo que cada jovem atendido possa construir um futuro digno e cheio de possibilidades.',
            ],
            pilares: [
                { titulo: 'Missão', desc: 'Promover cidadania e inclusão.' },
                { titulo: 'Visão', desc: 'Ser referência em assistência social.' },
                { titulo: 'Valores', desc: 'Ética, respeito e solidariedade.' },
            ],
        },
        atividades: {
            titulo: 'Desenvolvimento integral através da prática.',
            descricao: 'Equipes multidisciplinares e interdisciplinares nas áreas:',
            lista: [
                {
                    id: 'atv1',
                    ordem: '01',
                    titulo: 'Esportes e Lazer',
                    descricao: 'Futebol, karatê e recreação para integração social.',
                },
                {
                    id: 'atv2',
                    ordem: '02',
                    titulo: 'Artes e Ofícios',
                    descricao: 'Oficinas criativas e aprendizado técnico profissionalizante.',
                },
                {
                    id: 'atv3',
                    ordem: '03',
                    titulo: 'Apoio Psicológico',
                    descricao: 'Acompanhamento especializado para crianças e famílias.',
                },
            ],
        },
        projetos: {
            titulo: 'Iniciativas que transformam o presente.',
            descricao: 'Conheça alguns dos nossos projetos em destaque.',
            lista: [
                {
                    id: 'proj1',
                    titulo: 'Futuro em Foco',
                    detalhes: 'Preparação para o primeiro emprego e cidadania.',
                    parceiros: 'Empresas locais',
                    resultados: 'Mais de 100 jovens capacitados.',
                },
                {
                    id: 'proj2',
                    titulo: 'Música no CASCA',
                    detalhes: 'Corais e aulas de instrumentos para jovens talentos.',
                    parceiros: 'Escola de Música',
                    resultados: 'Apresentações anuais.',
                },
            ],
        },
        contato: {
            badge: 'Participe da Nossa Causa',
            titulo: 'Toda ajuda transforma um futuro.',
            descricao: 'Transforme a vida de crianças e adolescentes em Tremembé.',
            email: 'contato@casca.tatyverri.com',
            endereco: 'Bom Jesus, 61 - Centro - Tremembé/SP',
        },
    }

    await prisma.conteudo.upsert({
        where: { slug: 'principal' },
        update: { dados: conteudoHome },
        create: { slug: 'principal', dados: conteudoHome },
    })

    console.log('Banco de dados semeado com sucesso!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
