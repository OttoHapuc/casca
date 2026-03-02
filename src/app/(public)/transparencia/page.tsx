import { buscarRelatorios, buscarCidades } from '@/actions'
import Cabecalho from '../home/components/page.home.cabecalho'
import ListaRelatorios from './components/page.transparencia.lista-relatorios'
import CidadesAcordeao from './components/page.transparencia.cidades-acordeao'

export const dynamic = 'force-dynamic'

export default async function TransparenciaPage() {
  const [relatorios, cidadesResult] = await Promise.all([buscarRelatorios(), buscarCidades()])

  const cidades = cidadesResult.sucesso ? cidadesResult.dados : []

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Cabecalho />

      {/* Hero */}
      <section className="bg-deep-charcoal pt-32 pb-24 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="mb-6 text-5xl font-black">Portal de Transparência</h1>
            <p className="text-xl text-white/60">
              Acompanhe nossa prestação de contas, certificados e relatórios de atividades.
              Compromisso e ética em cada ação.
            </p>
          </div>
        </div>
      </section>

      {/* Relatórios */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-deep-charcoal mb-10 text-2xl font-black tracking-tight uppercase">
            Relatórios
          </h2>
          {relatorios.length === 0 ? (
            <div className="bg-light-cream rounded-[2rem] p-12 text-center">
              <p className="text-grey-accent italic">Nenhum relatório disponível no momento.</p>
            </div>
          ) : (
            <ListaRelatorios relatorios={relatorios} />
          )}
        </div>
      </section>

      {/* Documentos por Cidade — com paginação */}
      <section className="border-deep-charcoal/5 border-t py-24">
        <div className="container mx-auto px-6">
          <div className="mb-10">
            <h2 className="text-deep-charcoal text-2xl font-black tracking-tight uppercase">
              Documentos por Cidade
            </h2>
            <p className="text-grey-accent mt-2 text-sm">
              Navegue pelos documentos organizados por município.
            </p>
          </div>
          <CidadesAcordeao cidades={cidades} />
        </div>
      </section>

      <footer className="border-grey-accent/10 mt-auto border-t py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-grey-accent text-sm font-medium">
            &copy; {new Date().getFullYear()} C.A.S.C.A. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </main>
  )
}
