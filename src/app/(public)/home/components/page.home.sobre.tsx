'use client'

import { TipoSobre } from '@/types/app/home'

export default function Sobre({ titulo, paragrafos, pilares, imagemDestaque }: TipoSobre) {
  return (
    <section id="sobre" className="bg-white py-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center">
          <div className="lg:w-1/2">
            <span className="mb-4 inline-block text-sm font-black tracking-widest text-primary-yellow uppercase">
              Quem Somos
            </span>
            <h2 className="mb-8 text-3xl sm:text-4xl font-black leading-tight text-deep-charcoal md:text-5xl break-words">
              {titulo}
            </h2>
            <div className="space-y-6">
              {paragrafos.map((p, idx) => (
                <p key={idx} className="text-lg leading-relaxed text-grey-accent">
                  {p}
                </p>
              ))}
            </div>
            {imagemDestaque && (
              <div className="mt-12 overflow-hidden rounded-[2.5rem] shadow-2xl transition-transform hover:scale-[1.02]">
                <img
                  src={imagemDestaque}
                  alt="Destaque C.A.S.C.A"
                  className="h-64 w-full object-cover lg:hidden"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-16 lg:w-1/2">
            {imagemDestaque && (
              <div className="hidden overflow-hidden rounded-[3rem] shadow-2xl transition-transform hover:scale-[1.02] lg:block">
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
                  className={`group relative overflow-hidden rounded-[2rem] p-8 transition-all hover:scale-105 shadow-lg ${idx % 2 === 0
                    ? 'bg-primary-yellow text-deep-charcoal'
                    : 'bg-light-cream text-deep-charcoal'
                    } ${pilares.length % 2 !== 0 && idx === pilares.length - 1 ? 'sm:col-span-2' : ''}`}
                >
                  {pilar.imagem && (
                    <div className="absolute inset-0 z-0 overflow-hidden rounded-[2rem]">
                      <img
                        src={pilar.imagem}
                        alt={pilar.titulo}
                        className="h-full w-full object-cover opacity-30 transition-all duration-500 group-hover:scale-110 group-hover:opacity-50"
                      />
                      <div className={`absolute inset-0 ${idx % 2 === 0 ? 'bg-primary-yellow/40' : 'bg-white/40'}`} />
                    </div>
                  )}
                  <div className="relative z-10">
                    <div className="mb-4 text-2xl font-black uppercase">{pilar.titulo}</div>
                    <p className="text-lg opacity-80">{pilar.desc}</p>
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
