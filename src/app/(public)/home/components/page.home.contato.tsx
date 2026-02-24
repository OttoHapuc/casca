import { TipoContato } from '@/types/app/home'

export default function Contato({ badge, titulo, descricao, email, endereco, imagemFundo }: TipoContato) {
  return (
    <section id="contato" className="bg-light-cream py-32 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-accent-blue/10 blur-2xl" />
      <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-accent-rose/10 blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="relative overflow-hidden rounded-[3.5rem] bg-gradient-to-br from-white via-white to-light-cream border border-deep-charcoal/5 p-12 text-center md:p-24 shadow-2xl shadow-deep-charcoal/5">
          {imagemFundo && (
            <div className="absolute inset-0 z-0">
              <img
                src={imagemFundo}
                alt="Background"
                className="h-full w-full object-cover opacity-20 mix-blend-multiply"
              />
            </div>
          )}
          <div className="absolute -top-32 -left-32 h-64 w-64 rounded-full bg-primary-yellow/20 blur-3xl transition-all group-hover:bg-primary-yellow/30" />
          <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-accent-teal/10 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-3xl">
            <span className="mb-6 inline-block text-sm font-black tracking-widest text-deep-charcoal bg-primary-yellow px-6 py-2 rounded-full uppercase shadow-sm">
              {badge}
            </span>
            <h2 className="mb-8 text-3xl sm:text-4xl font-black leading-tight text-deep-charcoal md:text-6xl break-words drop-shadow-sm">
              {titulo}
            </h2>
            <p className="mb-12 text-xl font-medium leading-relaxed text-grey-accent">{descricao}</p>
            <div className="flex flex-col items-center justify-center space-y-6 sm:flex-row sm:space-y-0 sm:space-x-8">
              <a
                href={`mailto:${email}`}
                className="bg-primary-yellow text-deep-charcoal w-full rounded-2xl px-12 py-5 text-lg font-black transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary-yellow/30 active:scale-95 sm:w-auto"
              >
                Fale Conosco
              </a>
              <div className="text-left bg-white/50 p-4 rounded-2xl border border-deep-charcoal/5 backdrop-blur-sm">
                <div className="text-sm font-black text-accent-blue uppercase tracking-wider mb-1">
                  Sede Administrativa
                </div>
                <div className="text-sm font-medium text-deep-charcoal/70">{endereco}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
