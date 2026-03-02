import { TipoProjeto } from '@/types/app/home'

export default function Projetos({
  titulo,
  descricao,
  lista,
  imagemFundo,
}: {
  titulo: string
  descricao: string
  lista: TipoProjeto[]
  imagemFundo?: string
}) {
  return (
    <section id="projetos" className="bg-deep-charcoal relative overflow-hidden py-32 text-white">
      {imagemFundo && (
        <div className="absolute inset-0 z-0">
          <img
            src={imagemFundo}
            alt="Projetos Background"
            className="h-full w-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="from-deep-charcoal via-deep-charcoal/90 to-deep-charcoal absolute inset-0 bg-gradient-to-b" />
        </div>
      )}

      {/* Decorative Orbs */}
      <div className="bg-accent-blue/10 absolute top-0 right-0 h-96 w-96 rounded-full blur-[120px]" />
      <div className="bg-primary-yellow/10 absolute bottom-0 left-0 h-80 w-80 rounded-full blur-[100px]" />

      <div className="relative z-10 container mx-auto px-6">
        <div className="mb-16 flex flex-col items-center justify-between gap-8 md:flex-row md:items-end">
          <div className="text-center md:text-left">
            <span className="text-deep-charcoal bg-primary-yellow mb-4 inline-block rounded-full px-4 py-1.5 text-sm font-black tracking-widest uppercase shadow-sm">
              Projetos Especiais
            </span>
            <h2 className="max-w-xl text-3xl leading-tight font-black break-words drop-shadow-sm sm:text-4xl md:text-5xl">
              {titulo}
            </h2>
            {descricao && <p className="mt-4 max-w-2xl text-lg text-white/80">{descricao}</p>}
          </div>
          <a
            href="mailto:contato@casca.tatyverri.com"
            className="hover:text-deep-charcoal rounded-full border border-white/20 bg-white/10 px-8 py-4 font-bold backdrop-blur-md transition-all hover:-translate-y-1 hover:bg-white hover:shadow-lg"
          >
            Seja um parceiro
          </a>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {lista.map((proj, idx) => (
            <div
              key={proj.id || idx}
              className="group relative h-full min-h-[400px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-10 backdrop-blur-sm transition-all hover:-translate-y-2 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl"
            >
              <div className="from-accent-blue via-accent-teal to-primary-yellow absolute top-0 right-0 h-1 w-full bg-gradient-to-r opacity-50 transition-opacity group-hover:opacity-100" />
              {proj.imagem && (
                <div className="absolute inset-0 z-0">
                  <img
                    src={proj.imagem}
                    alt={proj.titulo}
                    className="h-full w-full object-cover opacity-40 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-70 group-hover:grayscale-[20%]"
                  />
                  <div className="from-deep-charcoal via-deep-charcoal/80 absolute inset-0 bg-gradient-to-t to-transparent" />
                </div>
              )}
              <div className="relative z-10 flex h-full flex-col">
                <h3 className="mb-6 text-2xl leading-tight font-black break-words text-white uppercase drop-shadow-sm sm:text-3xl md:text-4xl">
                  {proj.titulo}
                </h3>
                <div className="mt-auto space-y-4">
                  <p className="text-lg leading-relaxed text-white/90">
                    <span className="text-primary-yellow mb-1 block text-[10px] font-black tracking-[0.2em] uppercase">
                      Objetivo
                    </span>
                    {proj.detalhes}
                  </p>
                  <div className="mt-4 grid gap-6 rounded-2xl border border-white/5 bg-white/5 p-5 md:grid-cols-2">
                    <p className="text-sm text-white/80">
                      <span className="text-accent-teal mb-1 block text-[10px] font-black tracking-[0.2em] uppercase">
                        Parceiros
                      </span>
                      {proj.parceiros}
                    </p>
                    <p className="text-sm text-white/80">
                      <span className="text-accent-blue mb-1 block text-[10px] font-black tracking-[0.2em] uppercase">
                        Resultado
                      </span>
                      {proj.resultados}
                    </p>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute -top-10 -right-5 text-[12rem] font-black text-white/5 italic transition-all select-none group-hover:scale-110 group-hover:text-white/10">
                0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
