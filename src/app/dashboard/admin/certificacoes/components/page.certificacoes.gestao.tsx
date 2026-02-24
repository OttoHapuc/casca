'use client'

import { useState, useEffect } from 'react'
import { RespostaPadrao } from '@/types/api'
import { Plus, Trash2, Award, Image } from 'lucide-react'
import { TipoCertificacao } from '@/types/app/certificacoes'

export default function GestaoCertificacoes() {
    const [lista, setLista] = useState<TipoCertificacao[]>([])
    const [form, setForm] = useState({ titulo: '', imagemUrl: '' })
    const [carregando, setCarregando] = useState(true)
    const [salvando, setSalvando] = useState(false)
    const [mensagem, setMensagem] = useState<{ texto: string; erro?: boolean } | null>(null)

    useEffect(() => { carregar() }, [])

    async function carregar() {
        try {
            const res = await fetch('/api/auth/certificacoes')
            const data: RespostaPadrao = await res.json()
            if (data.sucesso) setLista(data.dados)
        } catch (e) {
            console.error('Erro:', e)
        } finally {
            setCarregando(false)
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setSalvando(true)
        setMensagem(null)
        try {
            const res = await fetch('/api/auth/certificacoes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            const data: RespostaPadrao = await res.json()
            if (data.sucesso) {
                await carregar()
                setForm({ titulo: '', imagemUrl: '' })
                setMensagem({ texto: 'Certificação adicionada com sucesso!' })
            } else {
                setMensagem({ texto: data.mensagem || 'Erro ao salvar', erro: true })
            }
        } catch {
            setMensagem({ texto: 'Erro de conexão', erro: true })
        } finally {
            setSalvando(false)
        }
    }

    async function excluir(id: string) {
        if (!confirm('Excluir esta certificação?')) return
        try {
            const res = await fetch(`/api/auth/certificacoes?id=${id}`, { method: 'DELETE' })
            const data: RespostaPadrao = await res.json()
            if (data.sucesso) setLista((l) => l.filter((c) => c.id !== id))
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="space-y-12 bg-white/50 rounded-[3rem] p-4 sm:p-8 backdrop-blur-sm">
            {/* Header */}
            <div className="flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-yellow to-yellow-500 text-deep-charcoal shadow-lg shadow-primary-yellow/30">
                    <Award size={24} />
                </div>
                <h2 className="text-3xl font-black text-deep-charcoal uppercase tracking-tighter drop-shadow-sm">
                    Nossas <span className="text-accent-blue">Certificações</span>
                </h2>
            </div>

            <div className="grid gap-12 lg:grid-cols-3">
                {/* Form */}
                <div className="lg:col-span-1">
                    <div className="sticky top-12 overflow-hidden rounded-[2.5rem] border border-white/50 bg-white/80 p-6 sm:p-8 shadow-xl shadow-grey-accent/5 backdrop-blur-md">
                        <div className="absolute top-0 left-0 h-full w-2 bg-gradient-to-b from-primary-yellow to-accent-blue" />
                        <h3 className="mb-6 flex items-center text-sm font-black uppercase tracking-widest text-deep-charcoal">
                            Nova Certificação
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <Input
                                label="Título da Certificação"
                                placeholder="Ex: Utilidade Pública Municipal nº 3.137"
                                value={form.titulo}
                                onChange={(v) => setForm({ ...form, titulo: v })}
                                required
                            />
                            <Input
                                label="URL da Imagem (Brasão / Logo)"
                                placeholder="https://..."
                                value={form.imagemUrl}
                                onChange={(v) => setForm({ ...form, imagemUrl: v })}
                                required
                            />
                            {form.imagemUrl && (
                                <div className="flex justify-center">
                                    <div className="h-24 w-24 overflow-hidden rounded-2xl border border-grey-accent/20 bg-white p-2 shadow-sm">
                                        <img src={form.imagemUrl} alt="Prévia" className="h-full w-full object-contain" />
                                    </div>
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={salvando}
                                className="flex w-full items-center justify-center space-x-2 rounded-2xl bg-primary-yellow py-4 font-black text-deep-charcoal shadow-lg shadow-primary-yellow/20 transition-all hover:scale-[1.02] hover:bg-yellow-400 active:scale-[0.98] disabled:opacity-50"
                            >
                                <Plus size={18} />
                                <span>{salvando ? 'Adicionando...' : 'Adicionar Certificação'}</span>
                            </button>
                        </form>
                        {mensagem && (
                            <div className={`mt-6 rounded-xl p-4 text-xs font-bold shadow-sm ${mensagem.erro ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-700 border border-green-100'}`}>
                                {mensagem.texto}
                            </div>
                        )}
                    </div>
                </div>

                {/* List */}
                <div className="lg:col-span-2">
                    <div className="overflow-hidden rounded-[2.5rem] border border-grey-accent/10 bg-white shadow-sm ring-1 ring-grey-accent/5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-light-cream text-[10px] font-black uppercase tracking-[0.2em] text-accent-blue border-b border-grey-accent/10">
                                        <td className="px-8 py-5">Imagem</td>
                                        <td className="px-8 py-5">Título</td>
                                        <td className="px-8 py-5 text-right">Ações</td>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-grey-accent/10">
                                    {carregando ? (
                                        <tr><td colSpan={3} className="px-8 py-10 text-center text-sm font-bold text-grey-accent italic">Carregando...</td></tr>
                                    ) : lista.length === 0 ? (
                                        <tr><td colSpan={3} className="px-8 py-10 text-center text-sm font-bold text-grey-accent">Nenhuma certificação cadastrada.</td></tr>
                                    ) : (
                                        lista.map((cert) => (
                                            <tr key={cert.id} className="group transition-colors hover:bg-light-cream/50">
                                                <td className="px-8 py-5">
                                                    <div className="h-14 w-14 overflow-hidden rounded-2xl bg-white shadow-sm border border-grey-accent/10 p-1 group-hover:border-accent-blue/30 transition-colors">
                                                        <img src={cert.imagemUrl} alt={cert.titulo} className="h-full w-full object-contain" />
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <span className="text-sm font-black text-deep-charcoal group-hover:text-accent-blue transition-colors">{cert.titulo}</span>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <button
                                                        onClick={() => excluir(cert.id)}
                                                        className="flex h-9 w-9 ml-auto items-center justify-center rounded-xl border border-grey-accent/10 text-grey-accent transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600 hover:shadow-sm"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Input({
    label, value, onChange, placeholder, required,
}: {
    label: string; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean
}) {
    return (
        <div className="space-y-2.5">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-blue">{label}</label>
            <input
                type="text"
                value={value}
                required={required}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-2xl border border-grey-accent/20 bg-white px-5 py-4 text-sm font-bold text-deep-charcoal outline-none transition-all placeholder:text-grey-accent/40 focus:border-accent-blue focus:ring-4 focus:ring-accent-blue/10 focus:shadow-lg"
            />
        </div>
    )
}
