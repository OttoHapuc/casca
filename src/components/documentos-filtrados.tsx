'use client'

import { useState, useMemo } from 'react'
import { ExternalLink, MapPin, ChevronLeft, ChevronRight, Search, X, FileText } from 'lucide-react'

type Anexo = {
  id: string
  titulo: string
  arquivoUrl: string
  classificacao: string
  criadoEm: string
  cidade: { nome: string }
}

const ICONE: Record<string, string> = {
  Ata: '📋',
  Balanço: '📊',
  Contrato: '📝',
  Relatório: '📄',
  Certidão: '🏛️',
  Outro: '📎',
}

const POR_PAGINA = 10

function ano(criadoEm: string) {
  return new Date(criadoEm).getFullYear().toString()
}

function contem(texto: string, busca: string) {
  return texto.toLowerCase().includes(busca.trim().toLowerCase())
}

interface Props {
  anexos: Anexo[]
  comAcoes?: boolean
  onExcluir?: (id: string) => void
}

export default function DocumentosFiltrados({ anexos, comAcoes, onExcluir }: Props) {
  const [titulo, setTitulo] = useState('')
  const [cidade, setCidade] = useState('')
  const [classificacao, setClassificacao] = useState('')
  const [anoFiltro, setAnoFiltro] = useState('')
  const [pagina, setPagina] = useState(1)

  const filtrados = useMemo(() => {
    return anexos.filter((a) => {
      if (titulo && !contem(a.titulo, titulo)) return false
      if (cidade && !contem(a.cidade.nome, cidade)) return false
      if (classificacao && !contem(a.classificacao, classificacao)) return false
      if (anoFiltro && !ano(a.criadoEm).includes(anoFiltro.trim())) return false
      return true
    })
  }, [anexos, titulo, cidade, classificacao, anoFiltro])

  // Reset page when filters change
  const paginaFinal = Math.min(pagina, Math.max(1, Math.ceil(filtrados.length / POR_PAGINA)))
  const total = filtrados.length
  const totalPaginas = Math.max(1, Math.ceil(total / POR_PAGINA))
  const inicio = (paginaFinal - 1) * POR_PAGINA
  const pagAtual = filtrados.slice(inicio, inicio + POR_PAGINA)

  const temFiltro = titulo || cidade || classificacao || anoFiltro

  function limpar() {
    setTitulo('')
    setCidade('')
    setClassificacao('')
    setAnoFiltro('')
    setPagina(1)
  }

  function mudarPagina(p: number) {
    setPagina(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="space-y-5">
      {/* Filter bar */}
      <div className="border-deep-charcoal/5 grid gap-3 rounded-[1.75rem] border bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
        <FilterInput
          icon={<Search size={12} />}
          placeholder="Título..."
          value={titulo}
          onChange={(v) => {
            setTitulo(v)
            setPagina(1)
          }}
        />
        <FilterInput
          icon={<MapPin size={12} />}
          placeholder="Cidade..."
          value={cidade}
          onChange={(v) => {
            setCidade(v)
            setPagina(1)
          }}
        />
        <FilterInput
          icon={<FileText size={12} />}
          placeholder="Classificação..."
          value={classificacao}
          onChange={(v) => {
            setClassificacao(v)
            setPagina(1)
          }}
        />
        <FilterInput
          icon={<Search size={12} />}
          placeholder="Ano (ex: 2024)"
          value={anoFiltro}
          onChange={(v) => {
            setAnoFiltro(v)
            setPagina(1)
          }}
          type="number"
        />
      </div>

      {/* Result info */}
      {temFiltro && (
        <div className="flex items-center justify-between px-1">
          <p className="text-grey-accent text-xs font-bold">
            {total} resultado{total !== 1 ? 's' : ''}
          </p>
          <button
            onClick={limpar}
            className="text-grey-accent hover:text-deep-charcoal flex items-center gap-1.5 text-xs font-black transition-colors"
          >
            <X size={11} /> Limpar
          </button>
        </div>
      )}

      {/* Empty */}
      {total === 0 && (
        <div className="bg-light-cream rounded-[1.75rem] p-10 text-center">
          <p className="text-grey-accent text-sm italic">
            {temFiltro ? 'Nenhum documento encontrado.' : 'Nenhum documento disponível.'}
          </p>
        </div>
      )}

      {/* Compact flexible-width card list */}
      {total > 0 && (
        <div className="flex flex-wrap gap-3">
          {pagAtual.map((anexo) => (
            <div
              key={anexo.id}
              className="group border-deep-charcoal/5 hover:border-primary-yellow/30 inline-flex items-center gap-3 rounded-2xl border bg-white px-4 py-3 shadow-sm transition-all hover:shadow-md"
            >
              {/* Icon */}
              <span className="flex-none text-lg leading-none">
                {ICONE[anexo.classificacao] ?? '📎'}
              </span>

              {/* Info */}
              <div className="min-w-0">
                <p className="text-deep-charcoal max-w-[280px] truncate text-sm font-black">
                  {anexo.titulo}
                </p>
                <div className="mt-0.5 flex items-center gap-2">
                  <span className="text-grey-accent text-[10px] font-bold tracking-wider uppercase">
                    {anexo.classificacao}
                  </span>
                  <span className="text-grey-accent/50 text-[10px]">·</span>
                  <span className="text-grey-accent/70 flex items-center gap-1 text-[10px]">
                    <MapPin size={8} className="flex-none" />
                    {anexo.cidade.nome}
                  </span>
                  <span className="text-grey-accent/50 text-[10px]">·</span>
                  <span className="text-grey-accent/60 text-[10px]">{ano(anexo.criadoEm)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <a
                  href={anexo.arquivoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-grey-accent hover:text-primary-yellow flex h-7 w-7 items-center justify-center rounded-lg"
                  title="Abrir"
                >
                  <ExternalLink size={13} />
                </a>
                {comAcoes && onExcluir && (
                  <button
                    onClick={() => onExcluir(anexo.id)}
                    className="text-grey-accent flex h-7 w-7 items-center justify-center rounded-lg hover:bg-red-50 hover:text-red-500"
                    title="Excluir"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPaginas > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-grey-accent text-xs">
            {inicio + 1}–{Math.min(inicio + POR_PAGINA, total)} de {total}
          </p>
          <div className="flex items-center gap-2">
            <NavBtn
              onClick={() => mudarPagina(Math.max(1, paginaFinal - 1))}
              disabled={paginaFinal === 1}
            >
              <ChevronLeft size={16} />
            </NavBtn>
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => mudarPagina(p)}
                className={`h-9 min-w-[2.25rem] rounded-full px-2 text-sm font-black transition-all ${
                  p === paginaFinal
                    ? 'bg-primary-yellow text-deep-charcoal shadow-md'
                    : 'border-deep-charcoal/10 text-grey-accent hover:border-primary-yellow/40 border bg-white'
                }`}
              >
                {p}
              </button>
            ))}
            <NavBtn
              onClick={() => mudarPagina(Math.min(totalPaginas, paginaFinal + 1))}
              disabled={paginaFinal === totalPaginas}
            >
              <ChevronRight size={16} />
            </NavBtn>
          </div>
        </div>
      )}
    </div>
  )
}

function FilterInput({
  icon,
  placeholder,
  value,
  onChange,
  type = 'text',
}: {
  icon: React.ReactNode
  placeholder: string
  value: string
  onChange: (v: string) => void
  type?: string
}) {
  return (
    <div className="relative flex items-center">
      <span className="text-grey-accent pointer-events-none absolute left-3.5">{icon}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="border-deep-charcoal/5 bg-light-cream/50 text-deep-charcoal placeholder:text-grey-accent/50 focus:border-primary-yellow w-full rounded-xl border py-2.5 pr-8 pl-8 text-sm font-bold transition-all outline-none placeholder:font-normal focus:bg-white"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="text-grey-accent hover:text-deep-charcoal absolute right-3"
        >
          <X size={11} />
        </button>
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
