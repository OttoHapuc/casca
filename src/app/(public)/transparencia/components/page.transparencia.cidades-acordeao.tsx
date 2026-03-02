'use client'

import { useState } from 'react'
import { TipoCidade } from '@/types/app/anexos'
import { ExternalLink, FileText, ChevronRight, MapPin, ChevronLeft } from 'lucide-react'

const ICONE_CLASSIFICACAO: Record<string, string> = {
  Ata: '📋',
  Balanço: '📊',
  Contrato: '📝',
  Relatório: '📄',
  Certidão: '🏛️',
  Outro: '📎',
}

const CIDADES_POR_PAGINA = 5

export default function CidadesAcordeao({ cidades }: { cidades: TipoCidade[] }) {
  const [pagina, setPagina] = useState(1)

  if (!cidades || cidades.length === 0) {
    return (
      <div className="bg-light-cream rounded-[2rem] p-12 text-center">
        <p className="text-grey-accent italic">Nenhum documento disponível no momento.</p>
      </div>
    )
  }

  const totalPaginas = Math.max(1, Math.ceil(cidades.length / CIDADES_POR_PAGINA))
  const inicio = (pagina - 1) * CIDADES_POR_PAGINA
  const cidadesPagina = cidades.slice(inicio, inicio + CIDADES_POR_PAGINA)

  return (
    <div className="space-y-6">
      {/* City accordions */}
      <div className="space-y-4">
        {cidadesPagina.map((cidade) => (
          <details
            key={cidade.id}
            className="group border-deep-charcoal/5 overflow-hidden rounded-[2rem] border bg-white shadow-sm transition-all open:shadow-lg"
          >
            <summary className="hover:bg-light-cream/40 flex cursor-pointer list-none items-center justify-between px-8 py-6 transition-colors">
              <div className="flex items-center gap-4">
                <div className="bg-primary-yellow/10 text-primary-yellow flex h-12 w-12 items-center justify-center rounded-2xl">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="text-deep-charcoal text-base font-black tracking-tight uppercase">
                    {cidade.nome}
                  </h3>
                  <p className="text-grey-accent text-[11px] font-bold">
                    {cidade.anexos.length} documento{cidade.anexos.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <ChevronRight
                size={20}
                className="text-grey-accent flex-none transition-transform duration-300 group-open:rotate-90"
              />
            </summary>

            <div className="border-deep-charcoal/5 border-t px-8 py-6">
              {cidade.anexos.length === 0 ? (
                <p className="text-grey-accent py-4 text-center text-sm italic">
                  Nenhum documento disponível para esta cidade.
                </p>
              ) : (
                <div className="space-y-3">
                  {Object.entries(
                    cidade.anexos.reduce<Record<string, typeof cidade.anexos>>((acc, a) => {
                      if (!acc[a.classificacao]) acc[a.classificacao] = []
                      acc[a.classificacao].push(a)
                      return acc
                    }, {}),
                  ).map(([classificacao, anexos]) => (
                    <div key={classificacao}>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-sm">
                          {ICONE_CLASSIFICACAO[classificacao] ?? '📎'}
                        </span>
                        <span className="text-grey-accent text-[10px] font-black tracking-[0.2em] uppercase">
                          {classificacao}
                        </span>
                      </div>
                      <div className="space-y-2 pl-6">
                        {anexos.map((anexo) => (
                          <a
                            key={anexo.id}
                            href={anexo.arquivoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="group/item border-deep-charcoal/5 bg-light-cream/40 hover:border-primary-yellow/40 flex items-center justify-between rounded-xl border px-5 py-3 transition-all hover:bg-white hover:shadow-sm"
                          >
                            <div className="flex items-center gap-3">
                              <FileText
                                size={14}
                                className="text-grey-accent group-hover/item:text-primary-yellow flex-none"
                              />
                              <span className="text-deep-charcoal text-sm font-bold">
                                {anexo.titulo}
                              </span>
                            </div>
                            <ExternalLink
                              size={13}
                              className="text-grey-accent group-hover/item:text-primary-yellow flex-none"
                            />
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </details>
        ))}
      </div>

      {/* Pagination */}
      {totalPaginas > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-grey-accent text-xs">
            Cidades {inicio + 1}–{Math.min(inicio + CIDADES_POR_PAGINA, cidades.length)} de{' '}
            {cidades.length}
          </p>
          <div className="flex items-center gap-2">
            <NavBtn onClick={() => setPagina((p) => Math.max(1, p - 1))} disabled={pagina === 1}>
              <ChevronLeft size={16} />
            </NavBtn>
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPagina(p)}
                className={`h-9 w-9 rounded-full text-sm font-black transition-all ${
                  p === pagina
                    ? 'bg-primary-yellow text-deep-charcoal shadow-md'
                    : 'border-deep-charcoal/10 text-grey-accent hover:border-primary-yellow/40 border bg-white'
                }`}
              >
                {p}
              </button>
            ))}
            <NavBtn
              onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
              disabled={pagina === totalPaginas}
            >
              <ChevronRight size={16} />
            </NavBtn>
          </div>
        </div>
      )}
    </div>
  )
}

function NavBtn({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void
  disabled: boolean
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="border-deep-charcoal/10 text-deep-charcoal hover:bg-primary-yellow hover:border-primary-yellow flex h-9 w-9 items-center justify-center rounded-full border bg-white transition-all disabled:opacity-30"
    >
      {children}
    </button>
  )
}
