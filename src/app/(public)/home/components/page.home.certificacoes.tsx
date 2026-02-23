'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Award } from 'lucide-react'
import { TipoCertificacao } from '@/types/app/certificacoes'

export default function Certificacoes({ lista }: { lista: TipoCertificacao[] }) {
    const [index, setIndex] = useState(0)
    const trackRef = useRef<HTMLDivElement>(null)

    const total = lista?.length ?? 0
    const visivel = 3
    const maxIndex = Math.max(0, total - visivel)

    useEffect(() => {
        if (!trackRef.current) return
        if (total === 0) return // Prevent division by zero if lista is empty
        const itemWidth = trackRef.current.scrollWidth / total
        trackRef.current.scrollTo({ left: itemWidth * index, behavior: 'smooth' })
    }, [index, total])

    return (
        <section id="certificacoes" className="bg-white py-24 overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="mb-16 text-center">
                    <span className="mb-4 inline-flex items-center gap-2 text-sm font-black tracking-widest text-primary-yellow uppercase">
                        <Award size={16} />
                        Reconhecimento Oficial
                    </span>
                    <h2 className="mx-auto max-w-2xl text-3xl sm:text-4xl font-black text-deep-charcoal uppercase tracking-tight">
                        Nossas Certificações
                    </h2>
                </div>

                {/* Carousel */}
                <div className="relative">
                    {/* Track */}
                    <div
                        ref={trackRef}
                        className="flex gap-6 overflow-x-hidden scroll-smooth"
                    >
                        {total === 0 ? (
                            <div className="w-full py-12 text-center text-grey-accent italic text-sm">
                                Nenhuma certificação cadastrada no momento.
                            </div>
                        ) : lista.map((cert, i) => (
                            <div
                                key={cert.id}
                                className="flex-none w-full sm:w-1/2 lg:w-1/3 group"
                            >
                                <div className="flex flex-col items-center gap-6 rounded-[2rem] border border-deep-charcoal/5 bg-light-cream/40 p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-deep-charcoal/5">
                                    {/* Image */}
                                    <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-full bg-white shadow-lg p-4">
                                        <img
                                            src={cert.imagemUrl}
                                            alt={cert.titulo}
                                            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    {/* Title */}
                                    <p className="text-center text-base font-black text-deep-charcoal leading-tight">
                                        {cert.titulo}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    {total > visivel && (
                        <div className="mt-10 flex items-center justify-center gap-4">
                            <button
                                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                                disabled={index === 0}
                                className="flex h-12 w-12 items-center justify-center rounded-full border border-deep-charcoal/10 bg-white text-deep-charcoal shadow-sm transition-all hover:bg-primary-yellow hover:border-primary-yellow disabled:opacity-30"
                                aria-label="Anterior"
                            >
                                <ChevronLeft size={20} />
                            </button>

                            {/* Dots */}
                            <div className="flex gap-2">
                                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setIndex(i)}
                                        className={`h-2 rounded-full transition-all ${i === index ? 'w-8 bg-primary-yellow' : 'w-2 bg-deep-charcoal/20'
                                            }`}
                                        aria-label={`Ir para página ${i + 1}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={() => setIndex((i) => Math.min(maxIndex, i + 1))}
                                disabled={index === maxIndex}
                                className="flex h-12 w-12 items-center justify-center rounded-full border border-deep-charcoal/10 bg-white text-deep-charcoal shadow-sm transition-all hover:bg-primary-yellow hover:border-primary-yellow disabled:opacity-30"
                                aria-label="Próximo"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
