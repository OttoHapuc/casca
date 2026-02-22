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
            alt="Background"
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-charcoal via-transparent to-deep-charcoal" />
        </div>
      )}
      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-16 flex flex-col items-center justify-between gap-8 md:flex-row md:items-end">
          <div className="text-center md:text-left">
            <span className="mb-4 inline-block text-sm font-black tracking-widest text-primary-yellow uppercase">
              Projetos Especiais
            </span>
            <h2 className="max-w-xl text-4xl font-black leading-tight md:text-5xl">
              {titulo}
            </h2>
            {descricao && <p className="mt-4 text-white/60">{descricao}</p>}
          </div>
          <a
            href="mailto:contato@casca.tatyverri.com"
            className="rounded-full border-2 border-white/10 bg-white/5 px-8 py-4 font-bold transition-all hover:bg-white hover:text-deep-charcoal"
          >
            Seja um parceiro
          </a>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {lista.map((proj, idx) => (
            <div
              key={proj.id || idx}
              className="group relative h-full min-h-[400px] overflow-hidden rounded-[2.5rem] bg-white/5 p-10 transition-all hover:bg-white/10"
            >
              {proj.imagem && (
                <div className="absolute inset-0 z-0">
                  <img
                    src={proj.imagem}
                    alt={proj.titulo}
                    className="h-full w-full object-cover opacity-40 grayscale transition-all group-hover:opacity-60 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal via-deep-charcoal/60 to-transparent" />
                </div>
              )}
              <div className="relative z-10 flex h-full flex-col">
                <h3 className="mb-6 text-3xl font-black text-primary-yellow uppercase leading-tight md:text-4xl">
                  {proj.titulo}
                </h3>
                <div className="mt-auto space-y-4">
                  <p className="text-lg leading-relaxed text-white/80">
                    <span className="block text-[10px] font-black tracking-[0.2em] text-white/40 uppercase">
                      Objetivo
                    </span>
                    {proj.detalhes}
                  </p>
                  <div className="grid gap-6 md:grid-cols-2">
                    <p className="text-sm text-white/60">
                      <span className="block text-[10px] font-black tracking-[0.2em] text-white/40 uppercase">
                        Parceiros
                      </span>
                      {proj.parceiros}
                    </p>
                    <p className="text-sm text-white/60">
                      <span className="block text-[10px] font-black tracking-[0.2em] text-white/40 uppercase">
                        Resultado
                      </span>
                      {proj.resultados}
                    </p>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute -top-10 -right-10 select-none text-[12rem] font-black italic text-white/5">
                0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
