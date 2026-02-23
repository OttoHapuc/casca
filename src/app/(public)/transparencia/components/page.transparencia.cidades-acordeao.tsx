'use client'

import { useState } from 'react'
import { TipoCidade } from '@/types/app/anexos'
import { ExternalLink, FileText, ChevronRight, MapPin, ChevronLeft } from 'lucide-react'

const ICONE_CLASSIFICACAO: Record<string, string> = {
    Ata: '📋', Balanço: '📊', Contrato: '📝',
    Relatório: '📄', Certidão: '🏛️', Outro: '📎',
}

const CIDADES_POR_PAGINA = 5

export default function CidadesAcordeao({ cidades }: { cidades: TipoCidade[] }) {
    const [pagina, setPagina] = useState(1)

    if (!cidades || cidades.length === 0) {
        return (
            <div className="rounded-[2rem] bg-light-cream p-12 text-center">
                <p className="italic text-grey-accent">Nenhum documento disponível no momento.</p>
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
                        className="group overflow-hidden rounded-[2rem] border border-deep-charcoal/5 bg-white shadow-sm transition-all open:shadow-lg"
                    >
                        <summary className="flex cursor-pointer list-none items-center justify-between px-8 py-6 transition-colors hover:bg-light-cream/40">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-yellow/10 text-primary-yellow">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h3 className="text-base font-black text-deep-charcoal uppercase tracking-tight">{cidade.nome}</h3>
                                    <p className="text-[11px] font-bold text-grey-accent">
                                        {cidade.anexos.length} documento{cidade.anexos.length !== 1 ? 's' : ''}
                                    </p>
                                </div>
                            </div>
                            <ChevronRight size={20} className="flex-none text-grey-accent transition-transform duration-300 group-open:rotate-90" />
                        </summary>

                        <div className="border-t border-deep-charcoal/5 px-8 py-6">
                            {cidade.anexos.length === 0 ? (
                                <p className="py-4 text-center text-sm italic text-grey-accent">
                                    Nenhum documento disponível para esta cidade.
                                </p>
                            ) : (
                                <div className="space-y-3">
                                    {Object.entries(
                                        cidade.anexos.reduce<Record<string, typeof cidade.anexos>>((acc, a) => {
                                            if (!acc[a.classificacao]) acc[a.classificacao] = []
                                            acc[a.classificacao].push(a)
                                            return acc
                                        }, {})
                                    ).map(([classificacao, anexos]) => (
                                        <div key={classificacao}>
                                            <div className="mb-2 flex items-center gap-2">
                                                <span className="text-sm">{ICONE_CLASSIFICACAO[classificacao] ?? '📎'}</span>
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-grey-accent">{classificacao}</span>
                                            </div>
                                            <div className="space-y-2 pl-6">
                                                {anexos.map((anexo) => (
                                                    <a
                                                        key={anexo.id}
                                                        href={anexo.arquivoUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="group/item flex items-center justify-between rounded-xl border border-deep-charcoal/5 bg-light-cream/40 px-5 py-3 transition-all hover:border-primary-yellow/40 hover:bg-white hover:shadow-sm"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <FileText size={14} className="flex-none text-grey-accent group-hover/item:text-primary-yellow" />
                                                            <span className="text-sm font-bold text-deep-charcoal">{anexo.titulo}</span>
                                                        </div>
                                                        <ExternalLink size={13} className="flex-none text-grey-accent group-hover/item:text-primary-yellow" />
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
                    <p className="text-xs text-grey-accent">
                        Cidades {inicio + 1}–{Math.min(inicio + CIDADES_POR_PAGINA, cidades.length)} de {cidades.length}
                    </p>
                    <div className="flex items-center gap-2">
                        <NavBtn onClick={() => setPagina((p) => Math.max(1, p - 1))} disabled={pagina === 1}>
                            <ChevronLeft size={16} />
                        </NavBtn>
                        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((p) => (
                            <button
                                key={p}
                                onClick={() => setPagina(p)}
                                className={`h-9 w-9 rounded-full text-sm font-black transition-all ${p === pagina
                                        ? 'bg-primary-yellow text-deep-charcoal shadow-md'
                                        : 'border border-deep-charcoal/10 bg-white text-grey-accent hover:border-primary-yellow/40'
                                    }`}
                            >{p}</button>
                        ))}
                        <NavBtn onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))} disabled={pagina === totalPaginas}>
                            <ChevronRight size={16} />
                        </NavBtn>
                    </div>
                </div>
            )}
        </div>
    )
}

function NavBtn({ onClick, disabled, children }: { onClick: () => void; disabled: boolean; children: React.ReactNode }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-deep-charcoal/10 bg-white text-deep-charcoal transition-all hover:bg-primary-yellow hover:border-primary-yellow disabled:opacity-30"
        >
            {children}
        </button>
    )
}
