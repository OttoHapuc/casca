import GestaoConteudo from './conteudo/components/page.conteudo.gestao'
import GestaoCertificacoes from './certificacoes/components/page.certificacoes.gestao'
import GestaoAnexos from './anexos/components/page.anexos.gestao'
import GestaoOuvidoria from './ouvidoria/components/page.ouvidoria.gestao'

export default function AdminDashboardPage() {
  return (
    <div className="space-y-16">
      <section id="conteudo" className="scroll-mt-32">
        <GestaoConteudo />
      </section>

      <section id="certificacoes" className="scroll-mt-32">
        <GestaoCertificacoes />
      </section>

      <section id="anexos" className="scroll-mt-32">
        <GestaoAnexos />
      </section>

      <section id="ouvidoria" className="scroll-mt-32">
        <GestaoOuvidoria />
      </section>
    </div>
  )
}
