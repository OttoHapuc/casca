'use client'

import { useState, useEffect } from 'react'
import { RespostaPadrao } from '@/types/api'
import { Plus, Trash2, FileText, Eye, Calendar } from 'lucide-react'
import { TipoRelatorio } from '@/types/app/transparencia'

export default function GestaoRelatorios() {
  const [relatorios, setRelatorios] = useState<TipoRelatorio[]>([])
  const [novoRelatorio, setNovoRelatorio] = useState({ titulo: '', url: '', ano: new Date().getFullYear() })
  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [mensagem, setMensagem] = useState<{ texto: string; erro?: boolean } | null>(null)

  useEffect(() => {
    carregarRelatorios()
  }, [])

  async function carregarRelatorios() {
    try {
      const res = await fetch('/api/auth/relatorios')
      const data: RespostaPadrao = await res.json()
      if (data.sucesso) setRelatorios(data.dados)
    } catch (e) {
      console.error('Erro:', e)
    } finally {
      setCarregando(false)
    }
  }

  async function handlesubmit(e: React.FormEvent) {
    e.preventDefault()
    setSalvando(true)
    setMensagem(null)

    try {
      const payload = {
        titulo: novoRelatorio.titulo,
        data: new Date(novoRelatorio.ano, 0, 1).toISOString(),
        categoria: 'Transparência',
        arquivoUrl: novoRelatorio.url
      }
      const res = await fetch('/api/auth/relatorios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data: RespostaPadrao = await res.json()

      if (data.sucesso) {
        await carregarRelatorios()
        setNovoRelatorio({ titulo: '', url: '', ano: new Date().getFullYear() })
        setMensagem({ texto: 'Documento adicionado com sucesso!' })
      } else {
        setMensagem({ texto: data.mensagem || 'Erro ao salvar', erro: true })
      }
    } catch (e) {
      setMensagem({ texto: 'Erro de conexão', erro: true })
    } finally {
      setSalvando(false)
    }
  }

  async function excluir(id: string) {
    if (!confirm('Tem certeza que deseja excluir este documento?')) return

    try {
      const res = await fetch(`/api/auth/relatorios?id=${id}`, { method: 'DELETE' })
      const data: RespostaPadrao = await res.json()
      if (data.sucesso) {
        setRelatorios(relatorios.filter((r) => r.id !== id))
        setMensagem({ texto: 'Documento removido!' })
      }
    } catch (e) {
      console.error('Erro ao excluir:', e)
    }
  }

  return (
    <div className="space-y-12">
      <div className="flex items-center space-x-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-yellow/10 text-primary-yellow">
          <FileText size={20} />
        </div>
        <h2 className="text-2xl font-black text-deep-charcoal uppercase tracking-tighter">
          Portal da <span className="text-primary-yellow">Transparência</span>
        </h2>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Formulário de Adição */}
        <div className="lg:col-span-1">
          <div className="sticky top-12 overflow-hidden rounded-[2.5rem] border border-white bg-white/60 p-8 shadow-2xl shadow-deep-charcoal/5 backdrop-blur-xl">
            <div className="absolute top-0 left-0 h-full w-1.5 bg-primary-yellow/20" />
            <h3 className="mb-6 text-sm font-black uppercase tracking-widest text-deep-charcoal">Novo Documento</h3>

            <form onSubmit={handlesubmit} className="space-y-5">
              <Input
                label="Título do Documento"
                placeholder="Ex: Relatório Anual 2023"
                value={novoRelatorio.titulo}
                onChange={(v) => setNovoRelatorio({ ...novoRelatorio, titulo: v })}
                required
              />
              <Input
                label="URL do PDF (Link Externo)"
                placeholder="https://..."
                value={novoRelatorio.url}
                onChange={(v) => setNovoRelatorio({ ...novoRelatorio, url: v })}
                required
              />
              <Input
                label="Ano de Referência"
                type="number"
                value={String(novoRelatorio.ano)}
                onChange={(v) => setNovoRelatorio({ ...novoRelatorio, ano: parseInt(v) })}
                required
              />

              <button
                type="submit"
                disabled={salvando}
                className="flex w-full items-center justify-center space-x-2 rounded-2xl bg-primary-yellow py-4 font-black text-deep-charcoal shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                <Plus size={18} />
                <span>{salvando ? 'Adicionando...' : 'Adicionar Documento'}</span>
              </button>
            </form>

            {mensagem && (
              <div className={`mt-6 rounded-xl p-4 text-xs font-bold ${mensagem.erro ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>
                {mensagem.texto}
              </div>
            )}
          </div>
        </div>

        {/* Listagem de Relatórios */}
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-[2.5rem] border border-deep-charcoal/5 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-deep-charcoal text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                    <td className="px-8 py-5">Documento</td>
                    <td className="px-8 py-5 text-center">Ano</td>
                    <td className="px-8 py-5 text-right">Ações</td>
                  </tr>
                </thead>
                <tbody className="divide-y divide-deep-charcoal/5">
                  {carregando ? (
                    <tr>
                      <td colSpan={3} className="px-8 py-10 text-center text-sm font-bold text-grey-accent italic">
                        Buscando arquivos...
                      </td>
                    </tr>
                  ) : relatorios.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-8 py-10 text-center text-sm font-bold text-grey-accent">
                        Nenhum documento cadastrado.
                      </td>
                    </tr>
                  ) : (
                    relatorios.map((rel) => (
                      <tr key={rel?.id} className="group transition-colors hover:bg-light-cream/30">
                        <td className="px-8 py-6">
                          <div className="flex items-center space-x-3">
                            <div>
                              <div className="text-sm font-black text-deep-charcoal">{rel?.titulo}</div>
                              <div className="text-[10px] font-black uppercase text-grey-accent/50 tracking-wider">
                                Adicionado em {new Date(rel?.data).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-center">
                          <span className="rounded-lg bg-deep-charcoal/5 px-3 py-1 text-xs font-black text-deep-charcoal group-hover:bg-primary-yellow group-hover:text-deep-charcoal">
                            {new Date(rel?.data).getFullYear()}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex justify-end space-x-2">
                            <a
                              href={rel?.arquivoUrl}
                              target="_blank"
                              className="flex h-9 w-9 items-center justify-center rounded-lg border border-deep-charcoal/5 text-grey-accent transition-all hover:border-primary-yellow hover:text-primary-yellow"
                              rel="noreferrer"
                            >
                              <Eye size={14} />
                            </a>
                            <button
                              onClick={() => excluir(rel?.id)}
                              className="flex h-9 w-9 items-center justify-center rounded-lg border border-deep-charcoal/5 text-grey-accent transition-all hover:border-red-100 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
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
  label,
  value,
  onChange,
  type = 'text',
  ...props
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'type'>) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-grey-accent">{label}</label>
      <input
        {...props}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-deep-charcoal/5 bg-light-cream/30 px-5 py-3.5 text-sm font-bold text-deep-charcoal outline-none transition-all placeholder:text-grey-accent/30 focus:border-primary-yellow focus:bg-white focus:shadow-lg focus:shadow-primary-yellow/5"
      />
    </div>
  )
}
