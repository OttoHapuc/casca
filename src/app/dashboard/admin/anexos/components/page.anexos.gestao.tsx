'use client'

import { useState, useEffect } from 'react'
import { RespostaPadrao } from '@/types/api'
import { Plus, Trash2, Paperclip, MapPin, ChevronDown, Tag } from 'lucide-react'
import { TipoCidade } from '@/types/app/anexos'
import DocumentosFiltrados from '@/components/documentos-filtrados'

type TipoClassificacao = { id: string; nome: string }

type AnexoFlat = {
  id: string
  titulo: string
  arquivoUrl: string
  classificacao: string
  criadoEm: string
  cidade: { nome: string }
}

export default function GestaoAnexos() {
  const [cidades, setCidades] = useState<TipoCidade[]>([])
  const [classificacoes, setClassificacoes] = useState<TipoClassificacao[]>([])
  const [anexos, setAnexos] = useState<AnexoFlat[]>([])
  const [carregando, setCarregando] = useState(true)
  const [mensagem, setMensagem] = useState<{ texto: string; erro?: boolean } | null>(null)

  // City form
  const [nomeCidade, setNomeCidade] = useState('')
  const [salvandoCidade, setSalvandoCidade] = useState(false)

  // Classification form
  const [nomeClassificacao, setNomeClassificacao] = useState('')
  const [salvandoClassificacao, setSalvandoClassificacao] = useState(false)

  // Anexo form
  const [formAnexo, setFormAnexo] = useState({
    titulo: '',
    arquivoUrl: '',
    classificacao: '',
    cidadeId: '',
  })
  const [salvandoAnexo, setSalvandoAnexo] = useState(false)

  useEffect(() => {
    carregarTudo()
  }, [])

  async function carregarTudo() {
    setCarregando(true)
    try {
      const [resCidades, resClasses, resAnexos] = await Promise.all([
        fetch('/api/auth/cidades'),
        fetch('/api/auth/classificacoes'),
        fetch('/api/auth/anexos'),
      ])
      const [dataCidades, dataClasses, dataAnexos]: [
        RespostaPadrao,
        RespostaPadrao,
        RespostaPadrao,
      ] = await Promise.all([resCidades.json(), resClasses.json(), resAnexos.json()])
      if (dataCidades.sucesso) setCidades(dataCidades.dados)
      if (dataAnexos.sucesso) setAnexos(dataAnexos.dados)
      if (dataClasses.sucesso) {
        setClassificacoes(dataClasses.dados)
        if (dataClasses.dados.length > 0) {
          setFormAnexo((f) => ({ ...f, classificacao: dataClasses.dados[0].nome }))
        }
      }
    } catch (e) {
      console.error(e)
    } finally {
      setCarregando(false)
    }
  }

  function exibirMensagem(texto: string, erro = false) {
    setMensagem({ texto, erro })
    setTimeout(() => setMensagem(null), 4000)
  }

  // ── Classifications ──────────────────────────────────

  async function adicionarClassificacao(e: React.FormEvent) {
    e.preventDefault()
    setSalvandoClassificacao(true)
    try {
      const res = await fetch('/api/auth/classificacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nomeClassificacao }),
      })
      const data: RespostaPadrao = await res.json()
      if (data.sucesso) {
        const resClasses = await fetch('/api/auth/classificacoes')
        const dataClasses: RespostaPadrao = await resClasses.json()
        if (dataClasses.sucesso) setClassificacoes(dataClasses.dados)
        setNomeClassificacao('')
        exibirMensagem('Classificação adicionada!')
      } else {
        exibirMensagem(data.mensagem || 'Erro', true)
      }
    } catch {
      exibirMensagem('Erro de conexão', true)
    } finally {
      setSalvandoClassificacao(false)
    }
  }

  async function excluirClassificacao(id: string) {
    if (!confirm('Excluir esta classificação?')) return
    try {
      const res = await fetch(`/api/auth/classificacoes?id=${id}`, { method: 'DELETE' })
      const data: RespostaPadrao = await res.json()
      if (data.sucesso) {
        setClassificacoes((c) => c.filter((cl) => cl.id !== id))
        exibirMensagem('Classificação excluída!')
      }
    } catch (e) {
      console.error(e)
    }
  }

  // ── Cities ──────────────────────────────────────────

  async function adicionarCidade(e: React.FormEvent) {
    e.preventDefault()
    setSalvandoCidade(true)
    try {
      const res = await fetch('/api/auth/cidades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nomeCidade }),
      })
      const data: RespostaPadrao = await res.json()
      if (data.sucesso) {
        await carregarTudo()
        setNomeCidade('')
        exibirMensagem('Cidade adicionada!')
      } else {
        exibirMensagem(data.mensagem || 'Erro', true)
      }
    } catch {
      exibirMensagem('Erro de conexão', true)
    } finally {
      setSalvandoCidade(false)
    }
  }

  async function excluirCidade(id: string) {
    if (!confirm('Excluir esta cidade e todos os seus anexos?')) return
    try {
      const res = await fetch(`/api/auth/cidades?id=${id}`, { method: 'DELETE' })
      const data: RespostaPadrao = await res.json()
      if (data.sucesso) {
        setCidades((c) => c.filter((ci) => ci.id !== id))
        exibirMensagem('Cidade excluída!')
      }
    } catch (e) {
      console.error(e)
    }
  }

  // ── Attachments ──────────────────────────────────────

  async function adicionarAnexo(e: React.FormEvent) {
    e.preventDefault()
    if (!formAnexo.cidadeId) {
      exibirMensagem('Selecione uma cidade', true)
      return
    }
    if (!formAnexo.classificacao) {
      exibirMensagem('Selecione uma classificação', true)
      return
    }
    setSalvandoAnexo(true)
    try {
      const res = await fetch('/api/auth/anexos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formAnexo),
      })
      const data: RespostaPadrao = await res.json()
      if (data.sucesso) {
        await carregarTudo()
        setFormAnexo({
          titulo: '',
          arquivoUrl: '',
          classificacao: classificacoes[0]?.nome ?? '',
          cidadeId: formAnexo.cidadeId,
        })
        exibirMensagem('Documento adicionado!')
      } else {
        exibirMensagem(data.mensagem || 'Erro', true)
      }
    } catch {
      exibirMensagem('Erro de conexão', true)
    } finally {
      setSalvandoAnexo(false)
    }
  }

  async function excluirAnexo(id: string) {
    if (!confirm('Excluir este documento?')) return
    try {
      const res = await fetch(`/api/auth/anexos?id=${id}`, { method: 'DELETE' })
      const data: RespostaPadrao = await res.json()
      if (data.sucesso) {
        // Update both flat list and grouped list
        setAnexos((prev) => prev.filter((a) => a.id !== id))
        setCidades((prev) =>
          prev.map((c) => ({ ...c, anexos: c.anexos.filter((a) => a.id !== id) })),
        )
        exibirMensagem('Documento excluído!')
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="space-y-12 rounded-[3rem] bg-white/50 p-4 backdrop-blur-sm sm:p-8">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="from-primary-yellow text-deep-charcoal shadow-primary-yellow/30 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br to-yellow-500 shadow-lg">
          <Paperclip size={24} />
        </div>
        <h2 className="text-deep-charcoal text-3xl font-black tracking-tighter uppercase drop-shadow-sm">
          Gestão de <span className="text-accent-blue">Anexos</span>
        </h2>
      </div>

      {mensagem && (
        <div
          className={`rounded-2xl p-4 text-sm font-bold shadow-sm ${mensagem.erro ? 'border border-red-100 bg-red-50 text-red-600' : 'border border-green-100 bg-green-50 text-green-700'}`}
        >
          {mensagem.texto}
        </div>
      )}

      {/* Row 1: Cities + Classifications */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Cities */}
        <Panel icon={<MapPin size={20} className="text-accent-blue" />} titulo="Gerenciar Cidades">
          <form onSubmit={adicionarCidade} className="mb-6 flex gap-3">
            <input
              type="text"
              value={nomeCidade}
              onChange={(e) => setNomeCidade(e.target.value)}
              placeholder="Nome da cidade..."
              required
              className={inputClass}
            />
            <BtnAdd loading={salvandoCidade} />
          </form>
          <TagList
            items={cidades.map((c) => ({
              id: c.id,
              nome: c.nome,
              extra: `${c.anexos.length} doc(s)`,
            }))}
            onDelete={excluirCidade}
            vazio="Nenhuma cidade cadastrada."
            carregando={carregando}
          />
        </Panel>

        {/* Classifications */}
        <Panel
          icon={<Tag size={20} className="text-accent-rose" />}
          titulo="Gerenciar Classificações"
        >
          <form onSubmit={adicionarClassificacao} className="mb-6 flex gap-3">
            <input
              type="text"
              value={nomeClassificacao}
              onChange={(e) => setNomeClassificacao(e.target.value)}
              placeholder="Ex: Ata, Balanço, Contrato..."
              required
              className={inputClass}
            />
            <BtnAdd loading={salvandoClassificacao} />
          </form>
          <TagList
            items={classificacoes.map((c) => ({ id: c.id, nome: c.nome }))}
            onDelete={excluirClassificacao}
            vazio="Nenhuma classificação cadastrada."
            carregando={carregando}
          />
        </Panel>
      </div>

      {/* Row 2: Add Document form */}
      <Panel
        icon={<Paperclip size={20} className="text-primary-yellow" />}
        titulo="Adicionar Documento"
        highlight={true}
      >
        <form onSubmit={adicionarAnexo} className="grid gap-5 md:grid-cols-2">
          <Input
            label="Título do Documento"
            placeholder="Ex: Ata da Reunião Jan/2024"
            value={formAnexo.titulo}
            onChange={(v) => setFormAnexo({ ...formAnexo, titulo: v })}
            required
          />
          <Input
            label="URL do Arquivo (PDF ou link)"
            placeholder="https://..."
            value={formAnexo.arquivoUrl}
            onChange={(v) => setFormAnexo({ ...formAnexo, arquivoUrl: v })}
            required
          />
          <Select
            label="Cidade"
            value={formAnexo.cidadeId}
            onChange={(v) => setFormAnexo({ ...formAnexo, cidadeId: v })}
            placeholder="Selecione a cidade..."
            options={cidades.map((c) => ({ value: c.id, label: c.nome }))}
          />
          <Select
            label="Classificação"
            value={formAnexo.classificacao}
            onChange={(v) => setFormAnexo({ ...formAnexo, classificacao: v })}
            placeholder="Selecione a classificação..."
            options={classificacoes.map((c) => ({ value: c.nome, label: c.nome }))}
          />
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={salvandoAnexo}
              className="bg-primary-yellow text-deep-charcoal shadow-primary-yellow/20 flex w-full items-center justify-center space-x-2 rounded-2xl py-4 font-black shadow-lg transition-all hover:scale-[1.02] hover:bg-yellow-400 active:scale-[0.98] disabled:opacity-50"
            >
              <Plus size={18} />
              <span>{salvandoAnexo ? 'Adicionando...' : 'Adicionar Documento'}</span>
            </button>
          </div>
        </form>
      </Panel>

      {/* Row 3: All Documents — filtered + paginated */}
      <div className="space-y-4">
        <h3 className="text-accent-blue ml-2 text-xs font-black tracking-widest uppercase">
          Todos os Documentos
        </h3>
        <div className="border-grey-accent/10 rounded-[2.5rem] border bg-white p-6 shadow-sm">
          {carregando ? (
            <p className="text-grey-accent p-4 text-sm italic">Carregando documentos...</p>
          ) : (
            <DocumentosFiltrados anexos={anexos} comAcoes onExcluir={excluirAnexo} />
          )}
        </div>
      </div>
    </div>
  )
}

// ── Sub-components ──────────────────────────────────────────────────────────

const inputClass =
  'flex-1 rounded-2xl border border-grey-accent/20 bg-white px-5 py-3 text-sm font-bold text-deep-charcoal outline-none transition-all placeholder:text-grey-accent/40 focus:border-accent-blue focus:ring-4 focus:ring-accent-blue/10 focus:shadow-lg'

function Panel({
  icon,
  titulo,
  children,
  highlight = false,
}: {
  icon: React.ReactNode
  titulo: string
  children: React.ReactNode
  highlight?: boolean
}) {
  return (
    <div className="shadow-grey-accent/5 relative overflow-hidden rounded-[2.5rem] border border-white/50 bg-white/80 p-8 shadow-xl backdrop-blur-md">
      <div
        className={`absolute top-0 left-0 h-full w-2 ${highlight ? 'from-primary-yellow to-accent-blue bg-gradient-to-b' : 'bg-primary-yellow/30'}`}
      />
      <div className="mb-6 flex items-center gap-3">
        {icon}
        <h3 className="text-deep-charcoal text-sm font-black tracking-widest uppercase">
          {titulo}
        </h3>
      </div>
      {children}
    </div>
  )
}

function BtnAdd({ loading }: { loading: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="bg-primary-yellow text-deep-charcoal shadow-primary-yellow/20 flex items-center gap-2 rounded-2xl px-5 py-3 text-xs font-black shadow-lg transition-all hover:scale-[1.02] disabled:opacity-50"
    >
      <Plus size={16} />
      {loading ? '...' : 'Adicionar'}
    </button>
  )
}

function TagList({
  items,
  onDelete,
  vazio,
  carregando,
}: {
  items: { id: string; nome: string; extra?: string }[]
  onDelete: (id: string) => void
  vazio: string
  carregando?: boolean
}) {
  if (carregando) return <p className="text-grey-accent text-sm italic">Carregando...</p>
  if (items.length === 0) return <p className="text-grey-accent text-sm">{vazio}</p>
  return (
    <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
      {items.map((item) => (
        <div
          key={item.id}
          className="group bg-light-cream/50 border-grey-accent/5 hover:border-accent-blue/20 flex items-center justify-between rounded-2xl border px-5 py-3 transition-all hover:bg-white hover:shadow-sm"
        >
          <div>
            <span className="text-deep-charcoal group-hover:text-accent-blue text-sm font-black transition-colors">
              {item.nome}
            </span>
            {item.extra && (
              <span className="text-grey-accent ml-3 text-[10px] font-bold">{item.extra}</span>
            )}
          </div>
          <button
            onClick={() => onDelete(item.id)}
            className="text-grey-accent flex h-8 w-8 items-center justify-center rounded-xl transition-all hover:border hover:border-red-100 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  required?: boolean
}) {
  return (
    <div className="space-y-2.5">
      <label className="text-accent-blue text-[10px] font-black tracking-[0.2em] uppercase">
        {label}
      </label>
      <input
        type="text"
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="border-grey-accent/20 text-deep-charcoal placeholder:text-grey-accent/40 focus:border-accent-blue focus:ring-accent-blue/10 w-full rounded-2xl border bg-white px-5 py-4 text-sm font-bold transition-all outline-none focus:shadow-lg focus:ring-4"
      />
    </div>
  )
}

function Select({
  label,
  value,
  onChange,
  placeholder,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  options: { value: string; label: string }[]
}) {
  return (
    <div className="space-y-2.5">
      <label className="text-accent-blue text-[10px] font-black tracking-[0.2em] uppercase">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          className="border-grey-accent/20 text-deep-charcoal focus:border-accent-blue focus:ring-accent-blue/10 w-full appearance-none rounded-2xl border bg-white px-5 py-4 text-sm font-bold transition-all outline-none focus:shadow-lg focus:ring-4"
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="text-grey-accent pointer-events-none absolute top-1/2 right-4 -translate-y-1/2"
        />
      </div>
    </div>
  )
}
