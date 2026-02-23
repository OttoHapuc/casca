import { buscarRelatorios, buscarCidades } from '@/actions'
import Cabecalho from '../home/components/page.home.cabecalho'
import ListaRelatorios from './components/page.transparencia.lista-relatorios'
import CidadesAcordeao from './components/page.transparencia.cidades-acordeao'

export const dynamic = 'force-dynamic'

export default async function TransparenciaPage() {
  const [relatorios, cidadesResult] = await Promise.all([
    buscarRelatorios(),
    buscarCidades(),
  ])

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
          <h2 className="mb-10 text-2xl font-black text-deep-charcoal uppercase tracking-tight">Relatórios</h2>
          {relatorios.length === 0 ? (
            <div className="rounded-[2rem] bg-light-cream p-12 text-center">
              <p className="italic text-grey-accent">Nenhum relatório disponível no momento.</p>
            </div>
          ) : (
            <ListaRelatorios relatorios={relatorios} />
          )}
        </div>
      </section>

      {/* Documentos por Cidade — com paginação */}
      <section className="border-t border-deep-charcoal/5 py-24">
        <div className="container mx-auto px-6">
          <div className="mb-10">
            <h2 className="text-2xl font-black text-deep-charcoal uppercase tracking-tight">Documentos por Cidade</h2>
            <p className="mt-2 text-sm text-grey-accent">
              Navegue pelos documentos organizados por município.
            </p>
          </div>
          <CidadesAcordeao cidades={cidades} />
        </div>
      </section>

      <footer className="mt-auto border-t border-grey-accent/10 py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm font-medium text-grey-accent">
            &copy; {new Date().getFullYear()} C.A.S.C.A. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </main>
  )
}
