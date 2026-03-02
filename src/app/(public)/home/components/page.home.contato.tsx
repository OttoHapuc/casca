import { TipoContato } from '@/types/app/home'

export default function Contato({
  badge,
  titulo,
  descricao,
  email,
  endereco,
  imagemFundo,
}: TipoContato) {
  return (
    <section id="contato" className="bg-light-cream relative overflow-hidden py-32">
      {/* Decorative Orbs */}
      <div className="bg-accent-blue/10 absolute top-10 left-10 h-32 w-32 rounded-full blur-2xl" />
      <div className="bg-accent-rose/10 absolute right-10 bottom-10 h-40 w-40 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-6">
        <div className="to-light-cream border-deep-charcoal/5 shadow-deep-charcoal/5 relative overflow-hidden rounded-[3.5rem] border bg-gradient-to-br from-white via-white p-12 text-center shadow-2xl md:p-24">
          {imagemFundo && (
            <div className="absolute inset-0 z-0">
              <img
                src={imagemFundo}
                alt="Background"
                className="h-full w-full object-cover opacity-20 mix-blend-multiply"
              />
            </div>
          )}
          <div className="bg-primary-yellow/20 group-hover:bg-primary-yellow/30 absolute -top-32 -left-32 h-64 w-64 rounded-full blur-3xl transition-all" />
          <div className="bg-accent-teal/10 absolute -right-32 -bottom-32 h-64 w-64 rounded-full blur-3xl" />

          <div className="relative z-10 mx-auto max-w-3xl">
            <span className="text-deep-charcoal bg-primary-yellow mb-6 inline-block rounded-full px-6 py-2 text-sm font-black tracking-widest uppercase shadow-sm">
              {badge}
            </span>
            <h2 className="text-deep-charcoal mb-8 text-3xl leading-tight font-black break-words drop-shadow-sm sm:text-4xl md:text-6xl">
              {titulo}
            </h2>
            <p className="text-grey-accent mb-12 text-xl leading-relaxed font-medium">
              {descricao}
            </p>
            <div className="flex flex-col items-center justify-center space-y-6 sm:flex-row sm:space-y-0 sm:space-x-8">
              <a
                href={`mailto:${email}`}
                className="bg-primary-yellow text-deep-charcoal hover:shadow-primary-yellow/30 w-full rounded-2xl px-12 py-5 text-lg font-black transition-all hover:scale-105 hover:shadow-xl active:scale-95 sm:w-auto"
              >
                Fale Conosco
              </a>
              <div className="border-deep-charcoal/5 rounded-2xl border bg-white/50 p-4 text-left backdrop-blur-sm">
                <div className="text-accent-blue mb-1 text-sm font-black tracking-wider uppercase">
                  Sede Administrativa
                </div>
                <div className="text-deep-charcoal/70 text-sm font-medium">{endereco}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
