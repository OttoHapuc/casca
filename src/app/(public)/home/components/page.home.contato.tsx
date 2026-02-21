import { TipoContato } from '@/types/app/home'

export default function Contato({ badge, titulo, descricao, email, endereco }: TipoContato) {
  return (
    <section id="contato" className="bg-white py-32">
      <div className="container mx-auto px-6">
        <div className="relative overflow-hidden rounded-[3.5rem] bg-deep-charcoal p-12 text-center md:p-24 shadow-2xl">
          <div className="absolute -top-32 -left-32 h-64 w-64 rounded-full bg-primary-yellow/10 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-primary-yellow/5 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-3xl">
            <span className="mb-6 inline-block text-sm font-black tracking-widest text-primary-yellow uppercase">
              {badge}
            </span>
            <h2 className="mb-8 text-4xl font-black leading-tight text-white md:text-6xl">
              {titulo}
            </h2>
            <p className="mb-12 text-xl leading-relaxed text-white/60">{descricao}</p>
            <div className="flex flex-col items-center justify-center space-y-6 sm:flex-row sm:space-y-0 sm:space-x-8">
              <a
                href={`mailto:${email}`}
                className="bg-primary-yellow text-deep-charcoal w-full rounded-2xl px-12 py-5 text-lg font-black transition-all hover:scale-105 active:scale-95 sm:w-auto"
              >
                Fale Conosco
              </a>
              <div className="text-left">
                <div className="text-sm font-black text-white uppercase tracking-wider">
                  Sede Administrativa
                </div>
                <div className="text-sm text-white/50">{endereco}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
