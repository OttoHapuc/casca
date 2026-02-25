import Cabecalho from './components/page.home.cabecalho'
import Principal from './components/page.home.principal'
import Sobre from './components/page.home.sobre'
import Atividades from './components/page.home.atividades'
import Projetos from './components/page.home.projetos'
import Certificacoes from './components/page.home.certificacoes'
import Contato from './components/page.home.contato'
import { buscarConteudoHome, buscarCertificacoes } from '../../../actions'
import { TipoConteudoHome } from '@/types/app/home'
import Image from 'next/image'
import { MapPin, Mail, Facebook, Instagram, Phone } from 'lucide-react'

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

      <footer className="text-deep-charcoal mt-16 py-16" style={{ backgroundColor: '#ffe60033' }}>
        <div className="container mx-auto flex flex-col items-center space-y-10 px-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="shadow-deep-charcoal/15 flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-xl">
              <Image
                src="/logo2.jpg"
                alt="C.A.S.C.A"
                width={150}
                height={150}
                className="h-24 w-24 rounded-full object-cover"
              />
            </div>
            <p className="text-deep-charcoal text-xs font-black tracking-[0.35em] uppercase">
              C.A.S.C.A
            </p>
            <p className="max-w-xl text-center text-sm leading-snug font-black uppercase sm:text-base">
              Centro de Atendimento Social à Criança e ao Adolescente
            </p>
          </div>

          <div className="flex w-full flex-wrap items-center justify-center gap-10">
            <div className="flex max-w-[160px] flex-col items-center space-y-3 text-center text-sm font-medium">
              <div className="text-primary-yellow flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md">
                <MapPin size={20} />
              </div>
              <span>
                Bom Jesus, 61 - Centro
                <br />
                Tremembé/SP.
              </span>
            </div>

            <div className="flex max-w-[200px] flex-col items-center space-y-3 text-center text-sm font-medium">
              <div className="text-primary-yellow flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md">
                <Mail size={20} />
              </div>
              <span>cascafamilia@yahoo.com.br</span>
            </div>

            <div className="flex max-w-[140px] flex-col items-center space-y-3 text-center text-sm font-medium">
              <div className="text-primary-yellow flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md">
                <Facebook size={20} />
              </div>
              <span>ong.casca</span>
            </div>

            <div className="flex max-w-[140px] flex-col items-center space-y-3 text-center text-sm font-medium">
              <div className="text-primary-yellow flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md">
                <Instagram size={20} />
              </div>
              <span>ong.casca</span>
            </div>

            <div className="flex max-w-[160px] flex-col items-center space-y-3 text-center text-sm font-medium">
              <div className="text-primary-yellow flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md">
                <Phone size={20} />
              </div>
              <span>(12) 3674-1284</span>
            </div>
          </div>

          <div className="text-deep-charcoal/80 mt-4 w-full border-t border-yellow-300/50 pt-6 text-center text-xs font-medium">
            &copy; {new Date().getFullYear()} C.A.S.C.A. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </main>
  )
}
