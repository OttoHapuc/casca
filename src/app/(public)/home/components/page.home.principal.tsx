'use client'

import { TipoHero } from '@/types/app/home'

export default function Principal({ badge, titulo, subtitulo, imagemFundo }: TipoHero) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background pt-20">
      {/* Background Image / Pattern */}
      {imagemFundo && (
        <div className="absolute inset-0 z-0">
          <img
            src={imagemFundo}
            alt="Background"
            className="h-full w-full object-cover opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-light-cream/40 to-white/60" />
        </div>
      )}

      {/* Background Colorful Orbs */}
      <div className="absolute -top-40 -left-60 h-[500px] w-[500px] rounded-full bg-accent-blue/10 blur-[120px]" />
      <div className="absolute top-20 -right-40 h-[400px] w-[400px] rounded-full bg-primary-yellow/20 blur-[100px]" />
      <div className="absolute -bottom-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-accent-teal/10 blur-[150px]" />

      <div className="container relative z-10 mx-auto px-6 text-center">
        <div className="animate-fade-in-up mx-auto max-w-4xl">
          <span className="mb-6 inline-block rounded-full bg-primary-yellow/20 px-6 py-2 text-sm font-black tracking-widest text-deep-charcoal uppercase shadow-sm border border-primary-yellow/50">
            {badge}
          </span>

          <h1 className="mb-8 text-4xl font-black leading-[1.1] text-deep-charcoal sm:text-5xl md:text-7xl lg:text-8xl break-words drop-shadow-sm">
            {titulo.split(' ').map((word, idx) => (
              <span key={idx} className={idx > 2 ? 'bg-gradient-to-r from-primary-yellow to-yellow-500 bg-clip-text text-transparent' : ''}>
                {word}{' '}
              </span>
            ))}
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-grey-accent sm:text-xl md:text-2xl font-medium">
            {subtitulo}
          </p>

          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
            <a
              href="#sobre"
              className="bg-primary-yellow text-deep-charcoal w-full rounded-2xl px-10 py-5 text-lg font-black transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary-yellow/30 active:scale-95 sm:w-auto"
            >
              Conheça Nossa História
            </a>
            <a
              href="/transparencia"
              className="w-full rounded-2xl border-2 border-deep-charcoal/10 bg-white px-10 py-5 text-lg font-black text-deep-charcoal shadow-sm transition-all hover:border-deep-charcoal/20 hover:bg-light-cream sm:w-auto hover:shadow-md"
            >
              Transparência
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer text-deep-charcoal/30 hover:text-primary-yellow transition-colors">
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
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
