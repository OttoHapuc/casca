'use client'

interface HeroProps {
  badge: string
  title: string
  subtitle: string
}

export default function Hero({ badge, title, subtitle }: HeroProps) {
  return (
    <section className="bg-deep-charcoal relative flex min-h-screen items-center justify-center overflow-hidden text-white">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="bg-primary-yellow/20 absolute -top-24 -left-24 h-96 w-96 animate-pulse rounded-full blur-3xl" />
        <div className="bg-primary-yellow/10 absolute top-1/2 -right-24 h-96 w-96 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="bg-primary-yellow/10 text-primary-yellow mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase">
          {badge}
        </div>
        <h1 className="mb-8 text-5xl font-black tracking-tight md:text-7xl lg:text-8xl">
          {title.split('SOCIAL')[0]} <br className="hidden md:block" />
          <span className="text-primary-yellow">SOCIAL</span>
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-lg text-white/70 md:text-xl">{subtitle}</p>
        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
          <a
            href="#sobre"
            className="group hover:text-deep-charcoal flex items-center space-x-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 font-bold transition-all hover:bg-white"
          >
            <span>Conheça nossa história</span>
          </a>
          <a
            href="#colabore"
            className="bg-primary-yellow text-deep-charcoal rounded-full px-8 py-4 font-bold transition-all hover:bg-white active:scale-95"
          >
            Como ajudar
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-6 w-px bg-white/30" />
      </div>
    </section>
  )
}
