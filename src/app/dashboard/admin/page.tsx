import GestaoRelatorios from './relatorios/components/page.relatorios.gestao'
import GestaoConteudo from './conteudo/components/page.conteudo.gestao'
import GestaoCertificacoes from './certificacoes/components/page.certificacoes.gestao'
import GestaoAnexos from './anexos/components/page.anexos.gestao'

export default function AdminDashboardPage() {
  return (
    <div className="space-y-16">
      <section id="conteudo" className="scroll-mt-32">
        <GestaoConteudo />
      </section>

      <section id="certificacoes" className="scroll-mt-32">
        <GestaoCertificacoes />
      </section>

      {/* <section id="transparencia" className="scroll-mt-32">
        <GestaoRelatorios />
      </section> */}

      <section id="anexos" className="scroll-mt-32">
        <GestaoAnexos />
      </section>
    </div>
  )
}
