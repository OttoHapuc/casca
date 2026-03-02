import { TipoAtividade } from '@/types/app/home'

export default function Atividades({
  titulo,
  descricao,
  lista,
  imagemFundo,
}: {
  titulo: string
  descricao: string
  lista: TipoAtividade[]
  imagemFundo?: string
}) {
  const getCorIcone = (idx: number) => {
    const cores = [
      'bg-primary-yellow/20 text-yellow-600',
      'bg-accent-blue/15 text-accent-blue',
      'bg-accent-teal/15 text-accent-teal',
      'bg-accent-rose/15 text-accent-rose',
      'bg-accent-purple/15 text-accent-purple',
    ]
    return cores[idx % cores.length]
  }

  return (
    <section id="atividades" className="bg-light-cream relative overflow-hidden py-32">
      {imagemFundo && (
        <div className="absolute inset-0 z-0">
          <img
            src={imagemFundo}
            alt="Atividades Background"
            className="h-full w-full object-cover opacity-20"
          />
          <div className="from-light-cream to-light-cream absolute inset-0 bg-gradient-to-b via-transparent" />
        </div>
      )}

      {/* Decorative Background Elements */}
      <div className="bg-accent-teal/5 absolute top-1/2 left-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]" />
      <div className="bg-accent-purple/5 absolute top-1/2 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]" />

      <div className="relative z-10 container mx-auto px-6">
        <div className="mb-16 text-center">
          <span className="bg-primary-yellow/20 border-primary-yellow/30 mb-4 inline-block rounded-full border px-4 py-1.5 text-sm font-black tracking-widest text-[#d97706] uppercase">
            Nossas Atividades
          </span>
          <h2 className="text-deep-charcoal mx-auto max-w-2xl text-3xl leading-tight font-black break-words sm:text-4xl md:text-5xl">
            {titulo}
          </h2>
          {descricao && <p className="text-grey-accent mt-4 text-lg font-medium">{descricao}</p>}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {lista.map((atv, idx) => (
            <div
              key={atv.id || idx}
              className="group hover:border-primary-yellow/30 relative overflow-hidden rounded-[2rem] border border-white bg-white p-8 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl"
            >
              {atv.imagem && (
                <div className="absolute inset-0 z-0 overflow-hidden rounded-[2rem]">
                  <img
                    src={atv.imagem}
                    alt={atv.titulo}
                    className="h-full w-full object-cover opacity-30 mix-blend-luminosity transition-transform duration-700 group-hover:scale-110 group-hover:opacity-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
                </div>
              )}
              <div className="relative z-10">
                <div
                  className={`mb-8 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-black ${getCorIcone(idx)} transition-transform group-hover:scale-110`}
                >
                  {atv.ordem || idx + 1}
                </div>
                <h3 className="text-deep-charcoal group-hover:text-accent-blue mb-3 text-xl leading-tight font-black uppercase transition-colors">
                  {atv.titulo}
                </h3>
                <p className="text-grey-accent text-sm leading-relaxed font-medium">
                  {atv.descricao}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
