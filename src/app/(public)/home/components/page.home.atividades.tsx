import { TipoAtividade } from '@/types/app/home'

export default function Atividades({
  titulo,
  descricao,
  lista,
}: {
  titulo: string
  descricao: string
  lista: TipoAtividade[]
}) {
  return (
    <section id="atividades" className="bg-light-cream py-32">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block text-sm font-black tracking-widest text-primary-yellow uppercase text-stroke-small">
            Nossas Atividades
          </span>
          <h2 className="mx-auto max-w-2xl text-4xl font-black leading-tight text-deep-charcoal md:text-5xl">
            {titulo}
          </h2>
          {descricao && <p className="mt-4 text-grey-accent">{descricao}</p>}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {lista.map((atv, idx) => (
            <div
              key={atv.id || idx}
              className="group rounded-[2rem] bg-white p-8 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-yellow/10 text-2xl font-black text-primary-yellow">
                {atv.ordem || idx + 1}
              </div>
              <h3 className="mb-3 text-xl font-black text-deep-charcoal uppercase leading-tight">
                {atv.titulo}
              </h3>
              <p className="text-sm leading-relaxed text-grey-accent">{atv.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
