
import Cabecalho from './components/page.home.cabecalho'
import Principal from './components/page.home.principal'
import Sobre from './components/page.home.sobre'
import Atividades from './components/page.home.atividades'
import Projetos from './components/page.home.projetos'
import Certificacoes from './components/page.home.certificacoes'
import Contato from './components/page.home.contato'
import { buscarConteudoHome, buscarCertificacoes } from '../../../actions'
import { TipoConteudoHome } from '@/types/app/home'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const conteudo = await buscarConteudoHome()
  const certResult = await buscarCertificacoes()
  const certificacoes = certResult.sucesso ? certResult.dados : []

  // Dados iniciais (mock) caso o banco esteja vazio
  const dadosIniciais: TipoConteudoHome = conteudo || {
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
      descricao: '',
      lista: [],
    },
    projetos: {
      titulo: 'Iniciativas que transformam o presente.',
      descricao: '',
      lista: [],
    },
    contato: {
      badge: 'Participe da Nossa Causa',
      titulo: 'Toda ajuda transforma um futuro.',
      descricao: '',
      email: 'contato@casca.tatyverri.com',
      endereco: 'Bom Jesus, 61 - Centro - Tremembé/SP',
    },
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Cabecalho />
      <Principal {...dadosIniciais.hero} />
      <Certificacoes lista={certificacoes} />
      <Sobre {...dadosIniciais.sobre} />
      <Atividades {...dadosIniciais.atividades} />
      <Projetos {...dadosIniciais.projetos} />
      <Contato {...dadosIniciais.contato} />

      <footer className="border-grey-accent/10 border-t py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-grey-accent text-sm font-medium">
            &copy; {new Date().getFullYear()} C.A.S.C.A. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </main>
  )
}
