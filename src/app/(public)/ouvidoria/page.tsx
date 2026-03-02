import Cabecalho from '../home/components/page.home.cabecalho'
import OuvidoriaForm from './components/page.ouvidoria.form'
import { buscarOuvidoriaConfig } from '@/actions'

export const dynamic = 'force-dynamic'

export default async function OuvidoriaPage() {
  const config = await buscarOuvidoriaConfig()

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Cabecalho />

      <section className="bg-deep-charcoal pt-32 pb-20 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl leading-tight font-black sm:text-5xl">Ouvidoria C.A.S.C.A</h1>
            <p className="text-base font-medium text-white/70 sm:text-lg">
              Este canal é destinado ao registro de reclamações, sugestões, elogios, solicitações e
              denúncias relacionadas aos serviços prestados pela instituição.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-light-cream py-16 sm:py-24">
        <div className="container mx-auto px-6">
          <OuvidoriaForm config={config} />
        </div>
      </section>
    </main>
  )
}
