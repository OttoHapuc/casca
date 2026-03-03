'use client'

import { useState, useEffect } from 'react'
import { Clock, CheckCircle2, AlertCircle, Edit, Save, X } from 'lucide-react'
import { buscarManifestacoes, atualizarStatusManifestacao } from '@/actions/page-action.admin.ouvidoria.manifestacoes'

const STATUS_OPCOES = ['Pendente', 'Em Análise', 'Concluído']

export default function GestaoManifestacoes() {
    const [manifestacoes, setManifestacoes] = useState<any[]>([])
    const [carregando, setCarregando] = useState(true)
    const [salvando, setSalvando] = useState(false)
    const [editando, setEditando] = useState<string | null>(null)

    // States para o modo edição
    const [statusTemp, setStatusTemp] = useState('')
    const [observacaoTemp, setObservacaoTemp] = useState('')

    const carregarManifestacoes = async () => {
        setCarregando(true)
        const dados = await buscarManifestacoes()
        setManifestacoes(dados)
        setCarregando(false)
    }

    useEffect(() => {
        carregarManifestacoes()
    }, [])

    const iniciarEdicao = (manifestacao: any) => {
        setEditando(manifestacao.id)
        setStatusTemp(manifestacao.status)
        setObservacaoTemp(manifestacao.observacaoAdmin || '')
    }

    const cancelarEdicao = () => {
        setEditando(null)
        setStatusTemp('')
        setObservacaoTemp('')
    }

    const salvarEdicao = async (id: string) => {
        setSalvando(true)
        const resposta = await atualizarStatusManifestacao(id, statusTemp, observacaoTemp)

        if (resposta.sucesso) {
            await carregarManifestacoes()
            cancelarEdicao()
        } else {
            alert(resposta.mensagem)
        }
        setSalvando(false)
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Concluído':
                return <CheckCircle2 className="text-green-500" size={18} />
            case 'Em Análise':
                return <Clock className="text-primary-yellow" size={18} />
            default:
                return <AlertCircle className="text-red-400" size={18} />
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Concluído':
                return 'bg-green-500/10 text-green-700 font-semibold'
            case 'Em Análise':
                return 'bg-primary-yellow/20 text-yellow-800 font-semibold'
            default:
                return 'bg-red-400/10 text-red-600 font-semibold'
        }
    }

    if (carregando) {
        return (
            <div className="rounded-3xl bg-white p-8 shadow-sm">
                <h2 className="mb-6 text-2xl font-black text-deep-charcoal">Respostas da Ouvidoria</h2>
                <div className="flex justify-center p-8">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-yellow border-t-transparent"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="rounded-3xl bg-white p-8 shadow-sm lg:p-12">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-deep-charcoal">Respostas da Ouvidoria</h2>
                    <p className="mt-1 text-sm text-grey-accent">
                        Gerencie as manifestações e submissões recebidas.
                    </p>
                </div>
                <div className="flex items-center space-x-2 rounded-2xl bg-slate-50 px-4 py-2 font-semibold text-deep-charcoal shadow-inner">
                    <MessageCircle size={18} className="text-primary-yellow" />
                    <span>{manifestacoes.length} Manifestações</span>
                </div>
            </div>

            {manifestacoes.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center">
                    <MessageCircle size={48} className="mb-4 text-slate-300" />
                    <p className="text-lg font-medium text-slate-500">Nenhuma manifestação recebida ainda.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {manifestacoes.map((item) => (
                        <div key={item.id} className="overflow-hidden rounded-2xl border border-slate-200 transition-all hover:border-primary-yellow/30 hover:shadow-md">
                            <div className="border-b border-slate-100 bg-slate-50 p-4">
                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex items-center space-x-3">
                                        <span className={`flex items-center space-x-1 rounded-full px-3 py-1 text-xs ${getStatusColor(item.status)}`}>
                                            {getStatusIcon(item.status)}
                                            <span>{item.status}</span>
                                        </span>
                                        <span className="text-xs font-bold text-slate-400">
                                            {new Date(item.criadoEm).toLocaleDateString('pt-BR', {
                                                day: '2-digit', month: '2-digit', year: 'numeric',
                                                hour: '2-digit', minute: '2-digit'
                                            })}
                                        </span>
                                        <span className="rounded-md bg-white px-2 py-0.5 text-xs font-bold text-accent-blue shadow-sm">
                                            {item.tipo}
                                        </span>
                                    </div>

                                    {editando !== item.id && (
                                        <button
                                            onClick={() => iniciarEdicao(item)}
                                            className="flex items-center space-x-1 rounded-lg bg-white px-3 py-1.5 text-sm font-bold text-deep-charcoal shadow-sm transition-colors hover:bg-slate-50"
                                        >
                                            <Edit size={16} />
                                            <span>Editar Status</span>
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase">Remetente</h4>
                                            <p className="font-medium text-deep-charcoal">
                                                {item.anonimo ? (
                                                    <span className="text-slate-500 italic">Anônimo</span>
                                                ) : (
                                                    item.nome || 'Não informado'
                                                )}
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase">Contato</h4>
                                            <p className="text-sm font-medium text-deep-charcoal">
                                                {item.meioContato || 'Sem preferência'}
                                                {item.desejaRetorno ? ' (Deseja Retorno)' : ' (Não quer retorno)'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase">Serviço/Local</h4>
                                            <p className="text-sm font-medium text-deep-charcoal">{item.cidadeServico}</p>
                                        </div>
                                        {item.dataOcorrido && (
                                            <div>
                                                <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase">Data do Ocorrido</h4>
                                                <p className="text-sm font-medium text-deep-charcoal">{item.dataOcorrido}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-6 rounded-xl bg-slate-50 p-4">
                                    <h4 className="mb-2 text-xs font-bold tracking-wider text-slate-400 uppercase">Mensagem</h4>
                                    <p className="text-sm leading-relaxed text-deep-charcoal whitespace-pre-wrap">{item.descricao}</p>

                                    {item.persiste && (
                                        <div className="mt-3 inline-block rounded-md bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-800">
                                            O problema persiste: {item.persiste}
                                        </div>
                                    )}
                                </div>

                                {/* Área de Edição e Observação */}
                                {editando === item.id ? (
                                    <div className="mt-6 animate-in fade-in slide-in-from-top-4 rounded-xl border border-primary-yellow/30 bg-primary-yellow/5 p-5">
                                        <h4 className="mb-4 text-sm font-black text-deep-charcoal">Atualizar Manifestação</h4>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="mb-1 block text-xs font-bold text-slate-500">Novo Status</label>
                                                <select
                                                    value={statusTemp}
                                                    onChange={(e) => setStatusTemp(e.target.value)}
                                                    className="w-full rounded-lg border border-slate-300 p-2.5 text-sm font-medium focus:border-primary-yellow focus:ring-1 focus:ring-primary-yellow outline-none"
                                                >
                                                    {STATUS_OPCOES.map(opt => (
                                                        <option key={opt} value={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="mb-1 block text-xs font-bold text-slate-500">Observação Interna</label>
                                                <textarea
                                                    value={observacaoTemp}
                                                    onChange={(e) => setObservacaoTemp(e.target.value)}
                                                    className="min-h-[100px] w-full resize-y rounded-lg border border-slate-300 p-3 text-sm focus:border-primary-yellow focus:ring-1 focus:ring-primary-yellow outline-none"
                                                    placeholder="Anotações sobre tratativas, resoluções, etc..."
                                                />
                                            </div>

                                            <div className="flex justify-end space-x-3 pt-2">
                                                <button
                                                    onClick={cancelarEdicao}
                                                    disabled={salvando}
                                                    className="flex items-center space-x-2 rounded-xl bg-slate-200 px-4 py-2 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-300 disabled:opacity-50"
                                                >
                                                    <X size={16} />
                                                    <span>Cancelar</span>
                                                </button>
                                                <button
                                                    onClick={() => salvarEdicao(item.id)}
                                                    disabled={salvando}
                                                    className="flex items-center space-x-2 rounded-xl bg-deep-charcoal px-4 py-2 text-sm font-bold text-primary-yellow transition-all hover:bg-black disabled:opacity-50 hover:shadow-lg"
                                                >
                                                    {salvando ? (
                                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-yellow border-t-transparent"></div>
                                                    ) : (
                                                        <Save size={16} />
                                                    )}
                                                    <span>Salvar Alterações</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : item.observacaoAdmin ? (
                                    <div className="mt-4 rounded-xl border-l-4 border-slate-800 bg-slate-100 p-4">
                                        <h4 className="mb-1 text-xs font-bold tracking-wider text-slate-500 uppercase">Observação Interna</h4>
                                        <p className="text-sm font-medium text-deep-charcoal whitespace-pre-wrap">{item.observacaoAdmin}</p>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
import { MessageCircle } from 'lucide-react'
