'use client'

import { useState, useEffect } from 'react'
import { RespostaPadrao } from '@/types/api'
import { Plus, Trash2, Paperclip, MapPin, ChevronDown, Tag } from 'lucide-react'
import { TipoCidade } from '@/types/app/anexos'
import DocumentosFiltrados from '@/components/documentos-filtrados'

type TipoClassificacao = { id: string; nome: string }

type AnexoFlat = {
    id: string; titulo: string; arquivoUrl: string
    classificacao: string; criadoEm: string
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
        titulo: '', arquivoUrl: '', classificacao: '', cidadeId: '',
    })
    const [salvandoAnexo, setSalvandoAnexo] = useState(false)

    useEffect(() => { carregarTudo() }, [])

    async function carregarTudo() {
        setCarregando(true)
        try {
            const [resCidades, resClasses, resAnexos] = await Promise.all([
                fetch('/api/auth/cidades'),
                fetch('/api/auth/classificacoes'),
                fetch('/api/auth/anexos'),
            ])
            const [dataCidades, dataClasses, dataAnexos]: [RespostaPadrao, RespostaPadrao, RespostaPadrao] = await Promise.all([
                resCidades.json(),
                resClasses.json(),
                resAnexos.json(),
            ])
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
        } catch (e) { console.error(e) }
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
        } catch { exibirMensagem('Erro de conexão', true) }
        finally { setSalvandoCidade(false) }
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
        } catch (e) { console.error(e) }
    }

    // ── Attachments ──────────────────────────────────────

    async function adicionarAnexo(e: React.FormEvent) {
        e.preventDefault()
        if (!formAnexo.cidadeId) { exibirMensagem('Selecione uma cidade', true); return }
        if (!formAnexo.classificacao) { exibirMensagem('Selecione uma classificação', true); return }
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
                setFormAnexo({ titulo: '', arquivoUrl: '', classificacao: classificacoes[0]?.nome ?? '', cidadeId: formAnexo.cidadeId })
                exibirMensagem('Documento adicionado!')
            } else {
                exibirMensagem(data.mensagem || 'Erro', true)
            }
        } catch { exibirMensagem('Erro de conexão', true) }
        finally { setSalvandoAnexo(false) }
    }

    async function excluirAnexo(id: string) {
        if (!confirm('Excluir este documento?')) return
        try {
            const res = await fetch(`/api/auth/anexos?id=${id}`, { method: 'DELETE' })
            const data: RespostaPadrao = await res.json()
            if (data.sucesso) {
                // Update both flat list and grouped list
                setAnexos((prev) => prev.filter((a) => a.id !== id))
                setCidades((prev) => prev.map((c) => ({ ...c, anexos: c.anexos.filter((a) => a.id !== id) })))
                exibirMensagem('Documento excluído!')
            }
        } catch (e) { console.error(e) }
    }

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-yellow/10 text-primary-yellow">
                    <Paperclip size={20} />
                </div>
                <h2 className="text-2xl font-black text-deep-charcoal uppercase tracking-tighter">
                    Gestão de <span className="text-primary-yellow">Anexos</span>
                </h2>
            </div>

            {mensagem && (
                <div className={`rounded-2xl p-4 text-sm font-bold ${mensagem.erro ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>
                    {mensagem.texto}
                </div>
            )}

            {/* Row 1: Cities + Classifications */}
            <div className="grid gap-8 lg:grid-cols-2">

                {/* Cities */}
                <Panel icon={<MapPin size={16} className="text-primary-yellow" />} titulo="Gerenciar Cidades">
                    <form onSubmit={adicionarCidade} className="mb-6 flex gap-3">
                        <input
                            type="text" value={nomeCidade} onChange={(e) => setNomeCidade(e.target.value)}
                            placeholder="Nome da cidade..." required
                            className={inputClass}
                        />
                        <BtnAdd loading={salvandoCidade} />
                    </form>
                    <TagList
                        items={cidades.map((c) => ({ id: c.id, nome: c.nome, extra: `${c.anexos.length} doc(s)` }))}
                        onDelete={excluirCidade}
                        vazio="Nenhuma cidade cadastrada."
                        carregando={carregando}
                    />
                </Panel>

                {/* Classifications */}
                <Panel icon={<Tag size={16} className="text-primary-yellow" />} titulo="Gerenciar Classificações">
                    <form onSubmit={adicionarClassificacao} className="mb-6 flex gap-3">
                        <input
                            type="text" value={nomeClassificacao} onChange={(e) => setNomeClassificacao(e.target.value)}
                            placeholder="Ex: Ata, Balanço, Contrato..." required
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
            <Panel icon={<Paperclip size={16} className="text-primary-yellow" />} titulo="Adicionar Documento">
                <form onSubmit={adicionarAnexo} className="grid gap-5 md:grid-cols-2">
                    <Input label="Título do Documento" placeholder="Ex: Ata da Reunião Jan/2024"
                        value={formAnexo.titulo} onChange={(v) => setFormAnexo({ ...formAnexo, titulo: v })} required />
                    <Input label="URL do Arquivo (PDF ou link)" placeholder="https://..."
                        value={formAnexo.arquivoUrl} onChange={(v) => setFormAnexo({ ...formAnexo, arquivoUrl: v })} required />
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
                            type="submit" disabled={salvandoAnexo}
                            className="flex w-full items-center justify-center space-x-2 rounded-2xl bg-primary-yellow py-4 font-black text-deep-charcoal shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                        >
                            <Plus size={18} />
                            <span>{salvandoAnexo ? 'Adicionando...' : 'Adicionar Documento'}</span>
                        </button>
                    </div>
                </form>
            </Panel>

            {/* Row 3: All Documents — filtered + paginated */}
            <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-primary-yellow">Todos os Documentos</h3>
                {carregando ? (
                    <p className="text-sm text-grey-accent italic">Carregando documentos...</p>
                ) : (
                    <DocumentosFiltrados
                        anexos={anexos}
                        comAcoes
                        onExcluir={excluirAnexo}
                    />
                )}
            </div>
        </div>
    )
}

// ── Sub-components ──────────────────────────────────────────────────────────

const inputClass = 'flex-1 rounded-2xl border border-deep-charcoal/5 bg-light-cream/30 px-5 py-3 text-sm font-bold text-deep-charcoal outline-none transition-all placeholder:text-grey-accent/40 focus:border-primary-yellow focus:bg-white'

function Panel({ icon, titulo, children }: { icon: React.ReactNode; titulo: string; children: React.ReactNode }) {
    return (
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white bg-white/60 p-8 shadow-2xl shadow-deep-charcoal/5 backdrop-blur-xl">
            <div className="absolute top-0 left-0 h-full w-1.5 bg-primary-yellow/20" />
            <div className="mb-6 flex items-center gap-3">
                {icon}
                <h3 className="text-sm font-black uppercase tracking-widest text-deep-charcoal">{titulo}</h3>
            </div>
            {children}
        </div>
    )
}

function BtnAdd({ loading }: { loading: boolean }) {
    return (
        <button type="submit" disabled={loading}
            className="flex items-center gap-2 rounded-2xl bg-primary-yellow px-5 py-3 text-xs font-black text-deep-charcoal shadow-lg transition-all hover:scale-[1.02] disabled:opacity-50"
        >
            <Plus size={16} />
            {loading ? '...' : 'Adicionar'}
        </button>
    )
}

function TagList({ items, onDelete, vazio, carregando }: {
    items: { id: string; nome: string; extra?: string }[]
    onDelete: (id: string) => void
    vazio: string
    carregando?: boolean
}) {
    if (carregando) return <p className="text-sm text-grey-accent italic">Carregando...</p>
    if (items.length === 0) return <p className="text-sm text-grey-accent">{vazio}</p>
    return (
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-2xl bg-light-cream/40 px-5 py-3">
                    <div>
                        <span className="text-sm font-black text-deep-charcoal">{item.nome}</span>
                        {item.extra && <span className="ml-3 text-[10px] font-bold text-grey-accent">{item.extra}</span>}
                    </div>
                    <button onClick={() => onDelete(item.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-grey-accent transition-all hover:bg-red-50 hover:text-red-600"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            ))}
        </div>
    )
}

function Input({ label, value, onChange, placeholder, required }: {
    label: string; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean
}) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-grey-accent">{label}</label>
            <input type="text" value={value} required={required} placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-2xl border border-deep-charcoal/5 bg-light-cream/30 px-5 py-3.5 text-sm font-bold text-deep-charcoal outline-none transition-all placeholder:text-grey-accent/30 focus:border-primary-yellow focus:bg-white focus:shadow-lg focus:shadow-primary-yellow/5"
            />
        </div>
    )
}

function Select({ label, value, onChange, placeholder, options }: {
    label: string; value: string; onChange: (v: string) => void; placeholder: string
    options: { value: string; label: string }[]
}) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-grey-accent">{label}</label>
            <div className="relative">
                <select value={value} onChange={(e) => onChange(e.target.value)} required
                    className="w-full appearance-none rounded-2xl border border-deep-charcoal/5 bg-light-cream/30 px-5 py-3.5 text-sm font-bold text-deep-charcoal outline-none transition-all focus:border-primary-yellow focus:bg-white"
                >
                    <option value="">{placeholder}</option>
                    {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-grey-accent" />
            </div>
        </div>
    )
}
