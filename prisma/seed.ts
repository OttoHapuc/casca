import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const conteudoHome = {
        hero: {
            badge: 'Desde 2004 transformando vidas',
            titulo: 'CENTRO DE ATENDIMENTO SOCIAL',
            subtitulo:
                'Promovendo a inclusão e o desenvolvimento de crianças e adolescentes em situações de vulnerabilidade social em Tremembé.',
            imagemFundo: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop',
        },
        sobre: {
            titulo: 'Mais de duas décadas de compromisso social.',
            paragrafos: [
                'Fundado in 2004, o Centro de Atendimento Social à Criança e ao Adolescente (C.A.S.C.A) nasceu de uma visão compartilhada por um grupo de voluntários dedicados à causa da infância em Tremembé/SP.',
                'Nossa missão é acolher e oferecer oportunidades de desenvolvimento integral, garantindo que cada jovem atendido possa construir um futuro digno e cheio de possibilidades.',
            ],
            pilares: [
                { titulo: 'Missão', desc: 'Promover cidadania e inclusão.', imagem: 'https://images.unsplash.com/photo-1559027615-cd99713b8bb7?q=80&w=2070&auto=format&fit=crop' },
                { titulo: 'Visão', desc: 'Ser referência em assistência social.', imagem: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2070&auto=format&fit=crop' },
                { titulo: 'Valores', desc: 'Ética, respeito e solidariedade.', imagem: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=2070&auto=format&fit=crop' },
            ],
            imagemDestaque: 'https://images.unsplash.com/photo-1524069290683-0457abfe42c3?q=80&w=2070&auto=format&fit=crop',
        },
        atividades: {
            titulo: 'Desenvolvimento integral através da prática.',
            descricao: 'Equipes multidisciplinares e interdisciplinares nas áreas:',
            imagemFundo: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2020&auto=format&fit=crop',
            lista: [
                {
                    id: 'atv1',
                    ordem: '01',
                    titulo: 'Esportes e Lazer',
                    descricao: 'Futebol, karatê e recreação para integração social.',
                    imagem: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop',
                },
                {
                    id: 'atv2',
                    ordem: '02',
                    titulo: 'Artes e Ofícios',
                    descricao: 'Oficinas criativas e aprendizado técnico profissionalizante.',
                    imagem: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop',
                },
                {
                    id: 'atv3',
                    ordem: '03',
                    titulo: 'Apoio Psicológico',
                    descricao: 'Acompanhamento especializado para crianças e famílias.',
                    imagem: 'https://images.unsplash.com/photo-1527137342181-19aab11a8ee1?q=80&w=2070&auto=format&fit=crop',
                },
            ],
        },
        projetos: {
            titulo: 'Iniciativas que transformam o presente.',
            descricao: 'Conheça alguns dos nossos projetos em destaque.',
            imagemFundo: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?q=80&w=2076&auto=format&fit=crop',
            lista: [
                {
                    id: 'proj1',
                    titulo: 'Futuro em Foco',
                    detalhes: 'Preparação para o primeiro emprego e cidadania.',
                    parceiros: 'Empresas locais',
                    resultados: 'Mais de 100 jovens capacitados.',
                    imagem: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop',
                },
                {
                    id: 'proj2',
                    titulo: 'Música no CASCA',
                    detalhes: 'Corais e aulas de instrumentos para jovens talentos.',
                    parceiros: 'Escola de Música',
                    resultados: 'Apresentações anuais.',
                    imagem: 'https://images.unsplash.com/photo-1514466108544-e758da20ff5a?q=80&w=2070&auto=format&fit=crop',
                },
            ],
        },
        contato: {
            badge: 'Participe da Nossa Causa',
            titulo: 'Toda ajuda transforma um futuro.',
            descricao: 'Transforme a vida de crianças e adolescentes em Tremembé.',
            imagemFundo: 'https://images.unsplash.com/photo-1469571486070-753a06256248?q=80&w=2070&auto=format&fit=crop',
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
