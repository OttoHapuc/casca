'use client'

import { TipoSobre } from '@/types/app/home'

export default function Sobre({ titulo, paragrafos, pilares }: TipoSobre) {
  return (
    <section id="sobre" className="bg-white py-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center">
          <div className="lg:w-1/2">
            <span className="mb-4 inline-block text-sm font-black tracking-widest text-primary-yellow uppercase">
              Quem Somos
            </span>
            <h2 className="mb-8 text-4xl font-black leading-tight text-deep-charcoal md:text-5xl">
              {titulo}
            </h2>
            <div className="space-y-6">
              {paragrafos.map((p, idx) => (
                <p key={idx} className="text-lg leading-relaxed text-grey-accent">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:w-1/2">
            {pilares.map((pilar, idx) => (
              <div
                key={idx}
                className={`group rounded-[2rem] p-8 transition-all hover:scale-105 ${idx === 0
                    ? 'bg-primary-yellow text-deep-charcoal'
                    : 'bg-light-cream text-deep-charcoal'
                  } ${idx === 2 ? 'sm:col-span-2' : ''}`}
              >
                <div className="mb-4 text-2xl font-black uppercase">{pilar.titulo}</div>
                <p className="text-lg opacity-80">{pilar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
