'use client'

import { useState, useEffect } from 'react'
import { RespostaPadrao } from '@/types/api'
import { TipoConteudoHome, TipoAtividade, TipoProjeto } from '@/types/app/home'
import { Plus, Trash2, Save, Wand2 } from 'lucide-react'

export default function GestaoConteudo() {
  const [conteudo, setConteudo] = useState<TipoConteudoHome | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [mensagem, setMensagem] = useState<{ texto: string; erro?: boolean } | null>(null)

  useEffect(() => {
    carregarConteudo()
  }, [])

  async function carregarConteudo() {
    try {
      const res = await fetch('/api/auth/home')
      const data: RespostaPadrao = await res.json()
      if (data.sucesso) {
        setConteudo(data.dados)
      }
    } catch (e) {
      console.error('Erro ao carregar conteúdo:', e)
    } finally {
      setCarregando(false)
    }
  }

  async function salvar(e?: React.FormEvent) {
    if (e) e.preventDefault()
    if (!conteudo) return
    setSalvando(true)
    setMensagem(null)

    try {
      const res = await fetch('/api/auth/home', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(conteudo),
      })
      const data: RespostaPadrao = await res.json()
      if (data.sucesso) {
        setMensagem({ texto: 'Alterações publicadas com sucesso!', erro: false })
      } else {
        setMensagem({ texto: data.mensagem || 'Erro ao salvar', erro: true })
      }
    } catch (e) {
      setMensagem({ texto: 'Erro de conexão com o servidor', erro: true })
    } finally {
      setSalvando(false)
      setTimeout(() => setMensagem(null), 5000)
    }
  }

  const addAtividade = () => {
    if (!conteudo) return
    const nova: TipoAtividade = {
      id: crypto.randomUUID(),
      ordem: String(conteudo.atividades.lista.length + 1).padStart(2, '0'),
      titulo: 'Nova Atividade',
      descricao: 'Descrição da atividade...',
      imagem: '',
    }
    setConteudo({
      ...conteudo,
      atividades: { ...conteudo.atividades, lista: [...conteudo.atividades.lista, nova] },
    })
  }

  const removeAtividade = (id: string) => {
    if (!conteudo) return
    setConteudo({
      ...conteudo,
      atividades: {
        ...conteudo.atividades,
        lista: conteudo.atividades.lista.filter((a) => a.id !== id),
      },
    })
  }

  const addProjeto = () => {
    if (!conteudo) return
    const novo: TipoProjeto = {
      id: crypto.randomUUID(),
      titulo: 'Novo Projeto',
      detalhes: 'Detalhes do projeto...',
      parceiros: 'Parceiros...',
      resultados: 'Resultados...',
      imagem: '',
    }
    setConteudo({
      ...conteudo,
      projetos: { ...conteudo.projetos, lista: [...conteudo.projetos.lista, novo] },
    })
  }

  const addPilar = () => {
    if (!conteudo) return
    const novo = { titulo: 'Novo Pilar', desc: 'Descrição do pilar...', imagem: '' }
    setConteudo({
      ...conteudo,
      sobre: { ...conteudo.sobre, pilares: [...conteudo.sobre.pilares, novo] },
    })
  }

  const removePilar = (index: number) => {
    if (!conteudo) return
    const newPilares = conteudo.sobre.pilares.filter((_, i) => i !== index)
    setConteudo({
      ...conteudo,
      sobre: { ...conteudo.sobre, pilares: newPilares },
    })
  }

  const removeProjeto = (id: string) => {
    if (!conteudo) return
    setConteudo({
      ...conteudo,
      projetos: {
        ...conteudo.projetos,
        lista: conteudo.projetos.lista.filter((p) => p.id !== id),
      },
    })
  }

  if (carregando)
    return (
      <div className="text-grey-accent flex items-center space-x-3 py-10 italic">
        <div className="border-primary-yellow h-5 w-5 animate-spin rounded-full border-2 border-t-transparent" />
        <span>Sincronizando dados com o site...</span>
      </div>
    )

  if (!conteudo)
    return (
      <div className="rounded-3xl border border-red-100 bg-red-50 p-10 text-center">
        <p className="font-black tracking-tight text-red-600 uppercase">
          Erro crítico de carregamento
        </p>
        <p className="mt-2 text-red-400">
          Não foi possível recuperar os dados da Home. Verifique o banco de dados.
        </p>
      </div>
    )

  return (
    <div className="space-y-12 rounded-[3rem] bg-white/50 p-4 backdrop-blur-sm sm:p-8">
      {/* Botão de Salvar Flutuante ou fixo no topo da seção */}
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex items-center space-x-3">
          <div className="from-primary-yellow text-deep-charcoal shadow-primary-yellow/30 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br to-yellow-500 shadow-lg">
            <Wand2 size={24} />
          </div>
          <h2 className="text-deep-charcoal text-3xl font-black tracking-tighter uppercase drop-shadow-sm">
            Gerenciador de <span className="text-accent-blue">Conteúdo</span>
          </h2>
        </div>
        <button
          onClick={() => salvar()}
          disabled={salvando}
          className="group bg-primary-yellow text-deep-charcoal shadow-primary-yellow/20 flex items-center justify-center space-x-2 rounded-2xl px-8 py-4 font-black shadow-xl transition-all hover:scale-[1.02] hover:bg-yellow-400 active:scale-[0.98] disabled:opacity-50"
        >
          <Save size={18} className={salvando ? 'animate-pulse' : ''} />
          <span>{salvando ? 'Salvando...' : 'Publicar Alterações'}</span>
        </button>
      </div>

      {mensagem && (
        <div
          className={`animate-fade-in-up rounded-2xl border p-5 text-sm font-bold shadow-sm transition-all ${mensagem.erro
              ? 'border-red-100 bg-red-50 text-red-600'
              : 'border-green-100 bg-green-50 text-green-700'
            }`}
        >
          {mensagem.texto}
        </div>
      )}

      <div className="grid gap-12">
        {/* HERO SECTION */}
        <Section title="Seção Hero (Capa)">
          <div className="grid gap-6 md:grid-cols-2">
            <Input
              label="Texto do Badge (Slogan)"
              value={conteudo.hero.badge}
              onChange={(v) => setConteudo({ ...conteudo, hero: { ...conteudo.hero, badge: v } })}
            />
            <Input
              label="Título Principal"
              value={conteudo.hero.titulo}
              onChange={(v) => setConteudo({ ...conteudo, hero: { ...conteudo.hero, titulo: v } })}
            />
            <div className="md:col-span-2">
              <Input
                label="URL da Imagem de Fundo"
                value={conteudo.hero.imagemFundo || ''}
                onChange={(v) =>
                  setConteudo({ ...conteudo, hero: { ...conteudo.hero, imagemFundo: v } })
                }
              />
            </div>
            <div className="md:col-span-2">
              <Textarea
                label="Subtítulo / Descrição da página inicial"
                value={conteudo.hero.subtitulo}
                onChange={(v) =>
                  setConteudo({ ...conteudo, hero: { ...conteudo.hero, subtitulo: v } })
                }
              />
            </div>
          </div>
        </Section>

        {/* SOBRE SECTION */}
        <Section title="Quem Somos (Sobre)">
          <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <Input
                label="Título de Apresentação"
                value={conteudo.sobre.titulo}
                onChange={(v) =>
                  setConteudo({ ...conteudo, sobre: { ...conteudo.sobre, titulo: v } })
                }
              />
              <Input
                label="URL da Imagem de Destaque"
                value={conteudo.sobre.imagemDestaque || ''}
                onChange={(v) =>
                  setConteudo({ ...conteudo, sobre: { ...conteudo.sobre, imagemDestaque: v } })
                }
              />
            </div>
            <div className="grid gap-6">
              {conteudo.sobre.paragrafos.map((p, i) => (
                <Textarea
                  key={i}
                  label={`Parágrafo de Conteúdo ${i + 1}`}
                  value={p}
                  onChange={(v) => {
                    const newP = [...conteudo.sobre.paragrafos]
                    newP[i] = v
                    setConteudo({ ...conteudo, sobre: { ...conteudo.sobre, paragrafos: newP } })
                  }}
                />
              ))}
            </div>
            <div className="border-deep-charcoal/5 flex items-center justify-between border-b pb-4">
              <h3 className="text-primary-yellow text-xs font-black tracking-widest uppercase">
                Cards de Destaque (Pilares)
              </h3>
              <button
                type="button"
                onClick={addPilar}
                className="flex items-center space-x-2 rounded-xl bg-green-50 px-4 py-2 text-xs font-black text-green-600 uppercase transition-all hover:bg-green-100"
              >
                <Plus size={14} />
                <span>Adicionar Pilar</span>
              </button>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {conteudo.sobre.pilares.map((pil, i) => (
                <div
                  key={i}
                  className="group border-grey-accent/10 hover:border-accent-blue/30 relative rounded-3xl border bg-white p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <button
                    type="button"
                    onClick={() => removePilar(i)}
                    className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg text-red-300 transition-all hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="bg-primary-yellow text-deep-charcoal mb-4 flex h-8 w-8 items-center justify-center rounded-lg text-xs font-black">
                    {i + 1}
                  </div>
                  <div className="space-y-4">
                    <Input
                      label="Título do Pilar"
                      value={pil.titulo}
                      onChange={(v) => {
                        const newPil = [...conteudo.sobre.pilares]
                        newPil[i] = { ...newPil[i], titulo: v }
                        setConteudo({ ...conteudo, sobre: { ...conteudo.sobre, pilares: newPil } })
                      }}
                    />
                    <Input
                      label="URL da Imagem do Card"
                      value={pil.imagem || ''}
                      onChange={(v) => {
                        const newPil = [...conteudo.sobre.pilares]
                        newPil[i] = { ...newPil[i], imagem: v }
                        setConteudo({ ...conteudo, sobre: { ...conteudo.sobre, pilares: newPil } })
                      }}
                    />
                    <Textarea
                      label="Descrição do Pilar"
                      value={pil.desc}
                      onChange={(v) => {
                        const newPil = [...conteudo.sobre.pilares]
                        newPil[i] = { ...newPil[i], desc: v }
                        setConteudo({ ...conteudo, sobre: { ...conteudo.sobre, pilares: newPil } })
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ATIVIDADES SECTION */}
        <Section title="Gestão de Atividades">
          <div className="mb-8 grid gap-6 md:grid-cols-2">
            <Input
              label="Título da Seção de Atividades"
              value={conteudo.atividades.titulo}
              onChange={(v) =>
                setConteudo({ ...conteudo, atividades: { ...conteudo.atividades, titulo: v } })
              }
            />
            <Input
              label="Subtítulo da Seção"
              value={conteudo.atividades.descricao}
              onChange={(v) =>
                setConteudo({ ...conteudo, atividades: { ...conteudo.atividades, descricao: v } })
              }
            />
            <div className="md:col-span-2">
              <Input
                label="URL da Imagem de Fundo (Seção Atividades)"
                value={conteudo.atividades.imagemFundo || ''}
                onChange={(v) =>
                  setConteudo({
                    ...conteudo,
                    atividades: { ...conteudo.atividades, imagemFundo: v },
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="border-deep-charcoal/5 flex items-center justify-between border-b pb-4">
              <h3 className="text-primary-yellow text-xs font-black tracking-widest uppercase">
                Cards de Atividades
              </h3>
              <button
                type="button"
                onClick={addAtividade}
                className="flex items-center space-x-2 rounded-xl bg-green-50 px-4 py-2 text-xs font-black text-green-600 uppercase transition-all hover:bg-green-100"
              >
                <Plus size={14} />
                <span>Adicionar</span>
              </button>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {conteudo.atividades.lista.map((atv, i) => (
                <div
                  key={atv.id}
                  className="group border-grey-accent/10 hover:border-accent-blue/30 relative rounded-3xl border bg-white p-8 shadow-sm transition-all hover:shadow-md"
                >
                  <button
                    type="button"
                    onClick={() => removeAtividade(atv.id)}
                    className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-xl text-red-300 transition-all hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                  <div className="grid gap-5">
                    <div className="flex items-center space-x-4">
                      <div className="w-20">
                        <Input
                          label="Nº"
                          value={atv.ordem}
                          onChange={(v) => {
                            const newList = [...conteudo.atividades.lista]
                            newList[i] = { ...newList[i], ordem: v }
                            setConteudo({
                              ...conteudo,
                              atividades: { ...conteudo.atividades, lista: newList },
                            })
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <Input
                          label="Título da Atividade"
                          value={atv.titulo}
                          onChange={(v) => {
                            const newList = [...conteudo.atividades.lista]
                            newList[i] = { ...newList[i], titulo: v }
                            setConteudo({
                              ...conteudo,
                              atividades: { ...conteudo.atividades, lista: newList },
                            })
                          }}
                        />
                      </div>
                    </div>
                    <Input
                      label="URL da Imagem da Atividade"
                      value={atv.imagem || ''}
                      onChange={(v) => {
                        const newList = [...conteudo.atividades.lista]
                        newList[i] = { ...newList[i], imagem: v }
                        setConteudo({
                          ...conteudo,
                          atividades: { ...conteudo.atividades, lista: newList },
                        })
                      }}
                    />
                    <Textarea
                      label="Descrição detalhada do que é feito"
                      value={atv.descricao}
                      onChange={(v) => {
                        const newList = [...conteudo.atividades.lista]
                        newList[i] = { ...newList[i], descricao: v }
                        setConteudo({
                          ...conteudo,
                          atividades: { ...conteudo.atividades, lista: newList },
                        })
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* PROJETOS SECTION */}
        <Section title="Projetos Estratégicos">
          <div className="mb-10 grid gap-6 md:grid-cols-2">
            <Input
              label="Chamada Principal (Título)"
              value={conteudo.projetos.titulo}
              onChange={(v) =>
                setConteudo({ ...conteudo, projetos: { ...conteudo.projetos, titulo: v } })
              }
            />
            <Input
              label="Descrição de Contexto"
              value={conteudo.projetos.descricao}
              onChange={(v) =>
                setConteudo({ ...conteudo, projetos: { ...conteudo.projetos, descricao: v } })
              }
            />
            <div className="md:col-span-2">
              <Input
                label="URL da Imagem de Fundo (Seção Projetos)"
                value={conteudo.projetos.imagemFundo || ''}
                onChange={(v) =>
                  setConteudo({ ...conteudo, projetos: { ...conteudo.projetos, imagemFundo: v } })
                }
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="border-deep-charcoal/5 flex items-center justify-between border-b pb-4">
              <h3 className="text-primary-yellow text-xs font-black tracking-widest uppercase">
                Mural de Projetos
              </h3>
              <button
                type="button"
                onClick={addProjeto}
                className="flex items-center space-x-2 rounded-xl bg-green-50 px-4 py-2 text-xs font-black text-green-600 uppercase transition-all hover:bg-green-100"
              >
                <Plus size={14} />
                <span>Novo Projeto</span>
              </button>
            </div>
            {conteudo.projetos.lista.map((proj, i) => (
              <div
                key={proj.id}
                className="border-grey-accent/10 hover:border-accent-blue/20 relative overflow-hidden rounded-[2.5rem] border bg-white p-10 shadow-sm transition-all hover:shadow-lg"
              >
                <div className="from-primary-yellow via-accent-teal to-accent-blue absolute top-0 right-0 h-1 w-full bg-gradient-to-l opacity-80" />
                <button
                  type="button"
                  onClick={() => removeProjeto(proj.id)}
                  className="absolute top-8 right-8 flex h-10 w-10 items-center justify-center rounded-xl text-red-300 transition-all hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={20} />
                </button>
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-6">
                    <Input
                      label="Nome do Projeto"
                      value={proj.titulo}
                      onChange={(v) => {
                        const newList = [...conteudo.projetos.lista]
                        newList[i] = { ...newList[i], titulo: v }
                        setConteudo({
                          ...conteudo,
                          projetos: { ...conteudo.projetos, lista: newList },
                        })
                      }}
                    />
                    <Input
                      label="URL da Imagem do Projeto"
                      value={proj.imagem || ''}
                      onChange={(v) => {
                        const newList = [...conteudo.projetos.lista]
                        newList[i] = { ...newList[i], imagem: v }
                        setConteudo({
                          ...conteudo,
                          projetos: { ...conteudo.projetos, lista: newList },
                        })
                      }}
                    />
                    <Textarea
                      label="Objetivos e Detalhes da Execução"
                      value={proj.detalhes}
                      onChange={(v) => {
                        const newList = [...conteudo.projetos.lista]
                        newList[i] = { ...newList[i], detalhes: v }
                        setConteudo({
                          ...conteudo,
                          projetos: { ...conteudo.projetos, lista: newList },
                        })
                      }}
                    />
                  </div>
                  <div className="flex flex-col justify-end space-y-6">
                    <Input
                      label="Principais Parceiros"
                      value={proj.parceiros}
                      onChange={(v) => {
                        const newList = [...conteudo.projetos.lista]
                        newList[i] = { ...newList[i], parceiros: v }
                        setConteudo({
                          ...conteudo,
                          projetos: { ...conteudo.projetos, lista: newList },
                        })
                      }}
                    />
                    <Input
                      label="Resultados Alcançados (Status Final)"
                      value={proj.resultados}
                      onChange={(v) => {
                        const newList = [...conteudo.projetos.lista]
                        newList[i] = { ...newList[i], resultados: v }
                        setConteudo({
                          ...conteudo,
                          projetos: { ...conteudo.projetos, lista: newList },
                        })
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* CONTATO SECTION */}
        <Section title="Informações de Contato">
          <div className="grid gap-6 md:grid-cols-2">
            <Input
              label="Subtítulo do Botão"
              value={conteudo.contato.badge}
              onChange={(v) =>
                setConteudo({ ...conteudo, contato: { ...conteudo.contato, badge: v } })
              }
            />
            <Input
              label="Título Chamada Final"
              value={conteudo.contato.titulo}
              onChange={(v) =>
                setConteudo({ ...conteudo, contato: { ...conteudo.contato, titulo: v } })
              }
            />
            <div className="md:col-span-2">
              <Input
                label="URL da Imagem de Fundo (Seção Contato)"
                value={conteudo.contato.imagemFundo || ''}
                onChange={(v) =>
                  setConteudo({ ...conteudo, contato: { ...conteudo.contato, imagemFundo: v } })
                }
              />
            </div>
            <div className="md:col-span-2">
              <Textarea
                label="Texto de Apoio (Contato)"
                value={conteudo.contato.descricao}
                onChange={(v) =>
                  setConteudo({ ...conteudo, contato: { ...conteudo.contato, descricao: v } })
                }
              />
            </div>
            <Input
              label="E-mail Institucional"
              value={conteudo.contato.email}
              onChange={(v) =>
                setConteudo({ ...conteudo, contato: { ...conteudo.contato, email: v } })
              }
            />
            <Input
              label="Endereço Completo"
              value={conteudo.contato.endereco}
              onChange={(v) =>
                setConteudo({ ...conteudo, contato: { ...conteudo.contato, endereco: v } })
              }
            />
            <Input
              label="Celular/WhatsApp"
              value={conteudo.contato.celular || ''}
              onChange={(v) =>
                setConteudo({ ...conteudo, contato: { ...conteudo.contato, celular: v } })
              }
            />
            <Input
              label="Instagram (usuário ou link)"
              value={conteudo.contato.instagram || ''}
              onChange={(v) =>
                setConteudo({ ...conteudo, contato: { ...conteudo.contato, instagram: v } })
              }
            />
            <Input
              label="Facebook (usuário ou link)"
              value={conteudo.contato.facebook || ''}
              onChange={(v) =>
                setConteudo({ ...conteudo, contato: { ...conteudo.contato, facebook: v } })
              }
            />
          </div>
        </Section>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="shadow-grey-accent/5 relative overflow-hidden rounded-[3rem] border border-white/50 bg-white/80 p-6 shadow-xl backdrop-blur-md transition-all sm:p-12">
      <div className="from-primary-yellow to-accent-blue absolute top-0 left-0 h-full w-2 bg-gradient-to-b" />
      <h3 className="text-deep-charcoal mb-10 flex items-center text-xl font-black tracking-widest uppercase">
        <span className="to-grey-accent/20 mr-4 h-px flex-1 bg-gradient-to-r from-transparent" />
        <span className="from-deep-charcoal to-grey-accent bg-gradient-to-r bg-clip-text text-transparent">
          {title}
        </span>
        <span className="to-grey-accent/20 ml-4 h-px flex-1 bg-gradient-to-l from-transparent" />
      </h3>
      <div className="relative z-10">{children}</div>
    </div>
  )
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="space-y-2.5">
      <label className="text-accent-blue text-[10px] font-black tracking-[0.2em] uppercase">
        {label}
      </label>
      <input
        type="text"
        className="border-grey-accent/20 text-deep-charcoal placeholder:text-grey-accent/40 focus:border-accent-blue focus:ring-accent-blue/10 w-full rounded-2xl border bg-white px-5 py-4 text-sm font-bold transition-all outline-none focus:shadow-lg focus:ring-4"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

function Textarea({
  label,
  value,
  onChange,
}: {
  label?: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="space-y-2.5">
      {label && (
        <label className="text-accent-blue text-[10px] font-black tracking-[0.2em] uppercase">
          {label}
        </label>
      )}
      <textarea
        className="border-grey-accent/20 text-deep-charcoal placeholder:text-grey-accent/40 focus:border-accent-blue focus:ring-accent-blue/10 block min-h-[120px] w-full rounded-2xl border bg-white px-5 py-4 text-sm font-bold transition-all outline-none focus:shadow-lg focus:ring-4"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
