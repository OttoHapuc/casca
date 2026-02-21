'use client'

import { TipoRelatorio } from '@/types/app/transparencia'

export default function ListaRelatorios({ relatorios }: { relatorios: TipoRelatorio[] }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {relatorios.map((relatorio) => (
        <div
          key={relatorio.id}
          className="group border-deep-charcoal/5 rounded-3xl border bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="mb-6 flex items-start justify-between">
            <span className="bg-primary-yellow rounded-full px-3 py-1 text-[10px] font-bold uppercase">
              {relatorio.categoria}
            </span>
            <span className="text-grey-accent text-xs">{relatorio.data}</span>
          </div>
          <h3 className="text-deep-charcoal group-hover:text-primary-yellow mb-8 text-xl font-bold transition-colors">
            {relatorio.titulo}
          </h3>
          <a
            href={relatorio.arquivoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-deep-charcoal border-primary-yellow hover:text-grey-accent inline-flex items-center space-x-2 border-b-2 pb-1 text-sm font-bold transition-colors"
          >
            <span>Download PDF</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </a>
        </div>
      ))}
    </div>
  )
}
