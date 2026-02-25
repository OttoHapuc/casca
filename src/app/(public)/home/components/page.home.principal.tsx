'use client'

import { TipoHero } from '@/types/app/home'

export default function Principal({ badge, titulo, subtitulo, imagemFundo }: TipoHero) {
  return (
    <section className="bg-background relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-20">
      {imagemFundo && (
        <div className="absolute inset-0 z-0">
          <img
            src={imagemFundo}
            alt="Background"
            className="h-full w-full object-cover opacity-40 mix-blend-luminosity"
          />
          <div className="via-light-cream/40 absolute inset-0 bg-gradient-to-br from-white/60 to-white/60" />
        </div>
      )}

      {/* Background Colorful Orbs */}
      <div className="bg-accent-blue/10 absolute -top-40 -left-60 h-[500px] w-[500px] rounded-full blur-[120px]" />
      <div className="bg-primary-yellow/20 absolute top-20 -right-40 h-[400px] w-[400px] rounded-full blur-[100px]" />
      <div className="bg-accent-teal/10 absolute -bottom-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full blur-[150px]" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="animate-fade-in-up mx-auto max-w-4xl">
          <span className="bg-primary-yellow/20 text-deep-charcoal border-primary-yellow/50 mb-6 inline-block rounded-full border px-6 py-2 text-sm font-black tracking-widest uppercase shadow-sm">
            {badge}
          </span>

          <h1 className="text-deep-charcoal mb-8 text-4xl leading-[1.1] font-black break-words drop-shadow-sm sm:text-5xl md:text-7xl lg:text-8xl">
            {titulo.split(' ').map((word, idx) => (
              <span
                key={idx}
                className={
                  idx > 2
                    ? 'from-primary-yellow bg-gradient-to-r to-yellow-500 bg-clip-text text-transparent'
                    : ''
                }
              >
                {word}{' '}
              </span>
            ))}
          </h1>

          <p className="text-grey-accent mx-auto mb-12 max-w-2xl text-lg leading-relaxed font-medium sm:text-xl md:text-2xl">
            {subtitulo}
          </p>

          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
            <a
              href="#sobre"
              className="bg-primary-yellow text-deep-charcoal hover:shadow-primary-yellow/30 w-full rounded-2xl px-10 py-5 text-lg font-black transition-all hover:scale-105 hover:shadow-xl active:scale-95 sm:w-auto"
            >
              Conheça Nossa História
            </a>
            <a
              href="/transparencia"
              className="border-deep-charcoal/10 text-deep-charcoal hover:border-deep-charcoal/20 hover:bg-light-cream w-full rounded-2xl border-2 bg-white px-10 py-5 text-lg font-black shadow-sm transition-all hover:shadow-md sm:w-auto"
            >
              Transparência
            </a>
            <a
              href="https://treinamentos.casca.ong.br/"
              target="_blank"
              rel="noreferrer"
              className="bg-primary-yellow text-deep-charcoal hover:shadow-primary-yellow/30 w-full rounded-2xl px-10 py-5 text-lg font-black transition-all hover:scale-105 hover:shadow-xl active:scale-95 sm:w-auto"
            >
              Treinamentos
            </a>
          </div>
        </div>
      </div>

      <div className="text-deep-charcoal/30 hover:text-primary-yellow absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer transition-colors">
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  )
}
