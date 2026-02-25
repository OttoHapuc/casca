'use client'

import { Award } from 'lucide-react'
import { TipoCertificacao } from '@/types/app/certificacoes'

export default function Certificacoes({ lista }: { lista: TipoCertificacao[] }) {
  const total = lista?.length ?? 0

  return (
    <section id="certificacoes" className="overflow-hidden bg-white py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <span className="text-primary-yellow mb-4 inline-flex items-center gap-2 text-sm font-black tracking-widest uppercase">
            <Award size={16} />
            Reconhecimento Oficial
          </span>
          <h2 className="text-deep-charcoal mx-auto max-w-2xl text-3xl font-black tracking-tight uppercase sm:text-4xl">
            Nossas Certificações
          </h2>
        </div>

        {total === 0 ? (
          <div className="text-grey-accent w-full py-12 text-center text-sm italic">
            Nenhuma certificação cadastrada no momento.
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-8">
            {lista.map((cert) => (
              <div key={cert.id} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
                <div className="border-deep-charcoal/5 bg-light-cream/40 hover:shadow-deep-charcoal/5 flex h-full flex-col items-center gap-6 rounded-[2rem] border p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-full bg-white p-4 shadow-lg">
                    <img
                      src={cert.imagemUrl}
                      alt={cert.titulo}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <p className="text-deep-charcoal text-center text-base leading-tight font-black">
                    {cert.titulo}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
