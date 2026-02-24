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
    <section id="projetos" className="relative bg-deep-charcoal py-32 text-white overflow-hidden">
      {imagemFundo && (
        <div className="absolute inset-0 z-0">
          <img
            src={imagemFundo}
            alt="Projetos Background"
            className="h-full w-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-charcoal via-deep-charcoal/90 to-deep-charcoal" />
        </div>
      )}

      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-accent-blue/10 blur-[120px]" />
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-primary-yellow/10 blur-[100px]" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-16 flex flex-col items-center justify-between gap-8 md:flex-row md:items-end">
          <div className="text-center md:text-left">
            <span className="mb-4 inline-block text-sm font-black tracking-widest text-deep-charcoal bg-primary-yellow px-4 py-1.5 rounded-full uppercase shadow-sm">
              Projetos Especiais
            </span>
            <h2 className="max-w-xl text-3xl sm:text-4xl font-black leading-tight md:text-5xl break-words drop-shadow-sm">
              {titulo}
            </h2>
            {descricao && <p className="mt-4 text-white/80 max-w-2xl text-lg">{descricao}</p>}
          </div>
          <a
            href="mailto:contato@casca.tatyverri.com"
            className="rounded-full border border-white/20 bg-white/10 px-8 py-4 font-bold backdrop-blur-md transition-all hover:bg-white hover:text-deep-charcoal hover:shadow-lg hover:-translate-y-1"
          >
            Seja um parceiro
          </a>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {lista.map((proj, idx) => (
            <div
              key={proj.id || idx}
              className="group relative h-full min-h-[400px] overflow-hidden rounded-[2.5rem] bg-white/5 border border-white/10 p-10 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="absolute top-0 right-0 h-1 w-full bg-gradient-to-r from-accent-blue via-accent-teal to-primary-yellow opacity-50 group-hover:opacity-100 transition-opacity" />
              {proj.imagem && (
                <div className="absolute inset-0 z-0">
                  <img
                    src={proj.imagem}
                    alt={proj.titulo}
                    className="h-full w-full object-cover opacity-40 grayscale transition-all duration-700 group-hover:opacity-70 group-hover:grayscale-[20%] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal via-deep-charcoal/80 to-transparent" />
                </div>
              )}
              <div className="relative z-10 flex h-full flex-col">
                <h3 className="mb-6 text-2xl sm:text-3xl font-black text-white uppercase leading-tight md:text-4xl break-words drop-shadow-sm">
                  {proj.titulo}
                </h3>
                <div className="mt-auto space-y-4">
                  <p className="text-lg leading-relaxed text-white/90">
                    <span className="block text-[10px] font-black tracking-[0.2em] text-primary-yellow uppercase mb-1">
                      Objetivo
                    </span>
                    {proj.detalhes}
                  </p>
                  <div className="grid gap-6 md:grid-cols-2 bg-white/5 rounded-2xl p-5 border border-white/5 mt-4">
                    <p className="text-sm text-white/80">
                      <span className="block text-[10px] font-black tracking-[0.2em] text-accent-teal uppercase mb-1">
                        Parceiros
                      </span>
                      {proj.parceiros}
                    </p>
                    <p className="text-sm text-white/80">
                      <span className="block text-[10px] font-black tracking-[0.2em] text-accent-blue uppercase mb-1">
                        Resultado
                      </span>
                      {proj.resultados}
                    </p>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute -top-10 -right-5 select-none text-[12rem] font-black italic text-white/5 transition-all group-hover:text-white/10 group-hover:scale-110">
                0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
