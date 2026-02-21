import GestaoRelatorios from './relatorios/components/page.relatorios.gestao'
import GestaoConteudo from './conteudo/components/page.conteudo.gestao'

export default function AdminDashboardPage() {
  return (
    <div className="space-y-16">
      <section id="conteudo" className="scroll-mt-32">
        <GestaoConteudo />
      </section>

      <section id="relatorios" className="scroll-mt-32">
        <GestaoRelatorios />
      </section>
    </div>
  )
}
