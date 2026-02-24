'use client'

import { TipoSobre } from '@/types/app/home'

export default function Sobre({ titulo, paragrafos, pilares, imagemDestaque }: TipoSobre) {
  const getCorPilar = (idx: number) => {
    // Array of light colorful gradients for the cards
    const cores = [
      'bg-primary-yellow text-deep-charcoal border border-primary-yellow/50',
      'bg-gradient-to-br from-accent-blue/10 to-transparent text-deep-charcoal border border-accent-blue/20',
      'bg-gradient-to-br from-accent-teal/10 to-transparent text-deep-charcoal border border-accent-teal/20',
      'bg-gradient-to-br from-accent-rose/10 to-transparent text-deep-charcoal border border-accent-rose/20'
    ]
    return cores[idx % cores.length]
  }

  return (
    <section id="sobre" className="bg-light-cream relative py-32 overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-accent-rose/5 blur-[80px]" />
      <div className="absolute bottom-0 left-0 h-80 w-80 translate-y-1/2 -translate-x-1/2 rounded-full bg-accent-blue/5 blur-[100px]" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center">
          <div className="lg:w-1/2">
            <span className="mb-4 inline-block text-sm font-black tracking-widest text-[#d97706] bg-primary-yellow/20 px-4 py-1.5 rounded-full uppercase border border-primary-yellow/30">
              Quem Somos
            </span>
            <h2 className="mb-8 text-3xl sm:text-4xl font-black leading-tight text-deep-charcoal md:text-5xl break-words">
              {titulo}
            </h2>
            <div className="space-y-6">
              {paragrafos.map((p, idx) => (
                <p key={idx} className="text-lg font-medium leading-relaxed text-grey-accent">
                  {p}
                </p>
              ))}
            </div>
            {imagemDestaque && (
              <div className="mt-12 overflow-hidden rounded-[2.5rem] shadow-xl ring-1 ring-deep-charcoal/5 transition-transform hover:scale-[1.02]">
                <img
                  src={imagemDestaque}
                  alt="Destaque C.A.S.C.A"
                  className="h-64 w-full object-cover lg:hidden"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-12 lg:w-1/2">
            {imagemDestaque && (
              <div className="hidden overflow-hidden rounded-[3rem] shadow-2xl ring-1 ring-deep-charcoal/5 transition-transform hover:scale-[1.02] lg:block">
                <img
                  src={imagemDestaque}
                  alt="Destaque C.A.S.C.A"
                  className="h-80 w-full object-cover"
                />
              </div>
            )}
            <div className="grid gap-6 sm:grid-cols-2">
              {pilares.map((pilar, idx) => (
                <div
                  key={idx}
                  className={`group relative overflow-hidden rounded-[2rem] p-8 transition-all hover:-translate-y-1 hover:shadow-xl ${getCorPilar(idx)} ${pilares.length % 2 !== 0 && idx === pilares.length - 1 ? 'sm:col-span-2' : ''}`}
                >
                  {pilar.imagem && (
                    <div className="absolute inset-0 z-0 overflow-hidden rounded-[2rem]">
                      <img
                        src={pilar.imagem}
                        alt={pilar.titulo}
                        className="h-full w-full object-cover opacity-30 mix-blend-overlay transition-all duration-500 group-hover:scale-110 group-hover:opacity-50"
                      />
                    </div>
                  )}
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-3 text-2xl font-black uppercase tracking-tight">{pilar.titulo}</div>
                    <p className="text-base font-medium opacity-80 mt-auto">{pilar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
