import { buscarRelatorios } from '@/actions'
export const dynamic = 'force-dynamic'
import Cabecalho from '../home/components/page.home.cabecalho'
import ListaRelatorios from './components/page.transparencia.lista-relatorios'

export default async function TransparenciaPage() {
  const relatorios = await buscarRelatorios()

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Cabecalho />

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

      <section className="py-24">
        <div className="container mx-auto px-6">
          {relatorios.length === 0 ? (
            <div className="bg-light-cream rounded-[2rem] p-12 text-center">
              <p className="text-grey-accent text-lg italic">
                Nenhum relatório disponível no momento.
              </p>
            </div>
          ) : (
            <ListaRelatorios relatorios={relatorios} />
          )}
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
