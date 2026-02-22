'use client'

import { TipoHero } from '@/types/app/home'

export default function Principal({ badge, titulo, subtitulo, imagemFundo }: TipoHero) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-deep-charcoal pt-20">
      {/* Background Image */}
      {imagemFundo && (
        <div className="absolute inset-0 z-0">
          <img
            src={imagemFundo}
            alt="Background"
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-charcoal/80 via-transparent to-deep-charcoal" />
        </div>
      )}

      {/* Background Orbs */}
      <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary-yellow/10 blur-[100px]" />
      <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-primary-yellow/5 blur-[100px]" />

      <div className="container relative z-10 mx-auto px-6 text-center">
        <div className="animate-fade-in-up mx-auto max-w-4xl">
          <span className="mb-6 inline-block rounded-full bg-primary-yellow/10 px-6 py-2 text-sm font-black tracking-widest text-primary-yellow uppercase">
            {badge}
          </span>

          <h1 className="mb-8 text-4xl font-black leading-[1.1] text-white sm:text-5xl md:text-7xl lg:text-8xl break-words">
            {titulo.split(' ').map((word, idx) => (
              <span key={idx} className={idx > 2 ? 'text-primary-yellow' : ''}>
                {word}{' '}
              </span>
            ))}
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl md:text-2xl">
            {subtitulo}
          </p>

          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
            <a
              href="#sobre"
              className="bg-primary-yellow text-deep-charcoal w-full rounded-2xl px-10 py-5 text-lg font-black transition-all hover:scale-105 active:scale-95 sm:w-auto"
            >
              Conheça Nossa História
            </a>
            <a
              href="/transparencia"
              className="w-full rounded-2xl border-2 border-white/10 px-10 py-5 text-lg font-black text-white transition-all hover:bg-white/5 sm:w-auto"
            >
              Transparência
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer text-white/20 hover:text-white/40 transition-colors">
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
