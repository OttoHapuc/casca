'use client'

import { useEffect, useState } from 'react'
import { TipoOuvidoriaConfig, ouvidoriaConfigPadrao } from '@/types/app/ouvidoria'

type Estado = 'inicial' | 'carregando' | 'pronto' | 'erro'

function Toggle({ checked, onChange }: { checked: boolean; onChange: (valor: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`inline-flex h-6 w-11 items-center rounded-full border px-0.5 transition-all ${
        checked ? 'border-primary-yellow bg-primary-yellow' : 'border-grey-accent/30 bg-white'
      }`}
    >
      <span
        className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  )
}

function CampoLinha({
  nomeCampo,
  config,
  onChange,
}: {
  nomeCampo: string
  config: {
    enabled: boolean
    required: boolean
    label: string
    options?: string[]
  }
  onChange: (config: TipoOuvidoriaConfig['fields'][keyof TipoOuvidoriaConfig['fields']]) => void
}) {
  return (
    <div className="border-grey-accent/15 grid grid-cols-1 items-center gap-4 rounded-2xl border bg-white/60 p-4 sm:grid-cols-[1.3fr,0.7fr,0.7fr]">
      <div className="space-y-1">
        <p className="text-grey-accent text-xs font-black tracking-[0.18em] uppercase">
          {nomeCampo}
        </p>
        <input
          type="text"
          value={config.label}
          onChange={(e) => onChange({ ...config, label: e.target.value })}
          className="border-grey-accent/20 text-deep-charcoal placeholder:text-grey-accent/40 focus:border-accent-blue focus:ring-accent-blue/10 w-full rounded-xl border bg-white px-3 py-2 text-sm font-bold transition-all outline-none focus:ring-4"
        />
      </div>

      <div className="flex items-center justify-between gap-3 sm:justify-center">
        <span className="text-grey-accent text-[11px] font-bold tracking-[0.18em] uppercase">
          Ativo
        </span>
        <Toggle
          checked={config.enabled}
          onChange={(valor) => onChange({ ...config, enabled: valor })}
        />
      </div>

      <div className="flex items-center justify-between gap-3 sm:justify-center">
        <span className="text-grey-accent text-[11px] font-bold tracking-[0.18em] uppercase">
          Obrigatório
        </span>
        <Toggle
          checked={config.required}
          onChange={(valor) => onChange({ ...config, required: valor })}
        />
      </div>
    </div>
  )
}

export default function GestaoOuvidoria() {
  const [estado, setEstado] = useState<Estado>('inicial')
  const [config, setConfig] = useState<TipoOuvidoriaConfig | null>(null)
  const [salvando, setSalvando] = useState(false)
  const [mensagem, setMensagem] = useState<{ texto: string; erro?: boolean } | null>(null)
  const [opcoesTipoTexto, setOpcoesTipoTexto] = useState('')
  const [opcoesMeioTexto, setOpcoesMeioTexto] = useState('')

  useEffect(() => {
    async function carregar() {
      setEstado('carregando')
      try {
        const resposta = await fetch('/api/auth/ouvidoria-config')
        const dados = await resposta.json()

        if (!dados || !dados.sucesso || !dados.dados) {
          setConfig(ouvidoriaConfigPadrao)
        } else {
          setConfig(dados.dados as TipoOuvidoriaConfig)
        }

        const cfg = (
          dados && dados.dados ? dados.dados : ouvidoriaConfigPadrao
        ) as TipoOuvidoriaConfig

        setOpcoesTipoTexto((cfg.fields.tipo.options || []).join('\n'))
        setOpcoesMeioTexto((cfg.fields.meioContato.options || []).join('\n'))

        setEstado('pronto')
      } catch (erro) {
        console.error('Erro ao carregar configuração da Ouvidoria:', erro)
        setConfig(ouvidoriaConfigPadrao)
        setOpcoesTipoTexto((ouvidoriaConfigPadrao.fields.tipo.options || []).join('\n'))
        setOpcoesMeioTexto((ouvidoriaConfigPadrao.fields.meioContato.options || []).join('\n'))
        setEstado('erro')
      }
    }

    carregar()
  }, [])

  async function salvar() {
    if (!config || salvando) return

    setSalvando(true)
    setMensagem(null)

    const limparLista = (texto: string) =>
      texto
        .split('\n')
        .map((t) => t.trim())
        .filter((t) => t.length > 0)

    const configuracaoAtualizada: TipoOuvidoriaConfig = {
      fields: {
        ...config.fields,
        tipo: {
          ...config.fields.tipo,
          options: limparLista(opcoesTipoTexto),
        },
        meioContato: {
          ...config.fields.meioContato,
          options: limparLista(opcoesMeioTexto),
        },
      },
    }

    try {
      const resposta = await fetch('/api/auth/ouvidoria-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(configuracaoAtualizada),
      })

      const json = await resposta.json()

      if (!json || !json.sucesso) {
        setMensagem({
          texto: json?.mensagem || 'Erro ao salvar configuração',
          erro: true,
        })
      } else {
        setConfig(configuracaoAtualizada)
        setMensagem({
          texto: 'Configuração salva com sucesso.',
        })
      }
    } catch (erro) {
      console.error('Erro ao salvar configuração da Ouvidoria (dashboard):', erro)
      setMensagem({
        texto: 'Erro ao salvar configuração. Tente novamente.',
        erro: true,
      })
    } finally {
      setSalvando(false)
      setTimeout(() => setMensagem(null), 8000)
    }
  }

  if (!config) {
    return (
      <section className="border-grey-accent/20 shadow-grey-accent/10 rounded-[3rem] border bg-white/80 p-6 shadow-xl backdrop-blur sm:p-10">
        <h2 className="text-grey-accent mb-4 text-xl font-black tracking-[0.2em] uppercase sm:text-2xl">
          Ouvidoria
        </h2>
        <p className="text-grey-accent text-sm font-medium">
          {estado === 'carregando'
            ? 'Carregando configuração da Ouvidoria...'
            : 'Não foi possível carregar a configuração da Ouvidoria.'}
        </p>
      </section>
    )
  }

  const campos = config.fields

  return (
    <section className="border-grey-accent/20 shadow-grey-accent/10 space-y-6 rounded-[3rem] border bg-white/90 p-6 shadow-xl backdrop-blur sm:p-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="space-y-2">
          <h2 className="text-grey-accent text-xl font-black tracking-[0.2em] uppercase sm:text-2xl">
            Ouvidoria
          </h2>
          <p className="text-grey-accent max-w-xl text-sm font-medium">
            Configure quais campos aparecem no formulário público de Ouvidoria, quais são
            obrigatórios e personalize os rótulos apresentados às pessoas usuárias.
          </p>
        </div>
        <button
          type="button"
          onClick={salvar}
          disabled={salvando}
          className="bg-primary-yellow text-deep-charcoal shadow-primary-yellow/30 w-full rounded-2xl px-8 py-3 text-sm font-black shadow-md transition-all hover:scale-[1.02] hover:bg-yellow-400 active:scale-[0.98] disabled:opacity-60 sm:w-auto"
        >
          {salvando ? 'Salvando...' : 'Salvar Configurações'}
        </button>
      </div>

      {mensagem && (
        <div
          className={`rounded-2xl border p-4 text-sm font-bold ${
            mensagem.erro
              ? 'border-red-100 bg-red-50 text-red-600'
              : 'border-green-100 bg-green-50 text-green-700'
          }`}
        >
          {mensagem.texto}
        </div>
      )}

      <div className="space-y-5">
        <CampoLinha
          nomeCampo="Identificação"
          config={campos.anonimo}
          onChange={(novo) =>
            setConfig({
              fields: {
                ...campos,
                anonimo: novo,
              },
            })
          }
        />

        <CampoLinha
          nomeCampo="Nome"
          config={campos.nome}
          onChange={(novo) =>
            setConfig({
              fields: {
                ...campos,
                nome: novo,
              },
            })
          }
        />

        <CampoLinha
          nomeCampo="Tipo de Manifestação"
          config={campos.tipo}
          onChange={(novo) =>
            setConfig({
              fields: {
                ...campos,
                tipo: novo,
              },
            })
          }
        />

        <CampoLinha
          nomeCampo="Cidade/Serviço"
          config={campos.cidadeServico}
          onChange={(novo) =>
            setConfig({
              fields: {
                ...campos,
                cidadeServico: novo,
              },
            })
          }
        />

        <CampoLinha
          nomeCampo="Data do Ocorrido"
          config={campos.dataOcorrido}
          onChange={(novo) =>
            setConfig({
              fields: {
                ...campos,
                dataOcorrido: novo,
              },
            })
          }
        />

        <CampoLinha
          nomeCampo="Descrição"
          config={campos.descricao}
          onChange={(novo) =>
            setConfig({
              fields: {
                ...campos,
                descricao: novo,
              },
            })
          }
        />

        <CampoLinha
          nomeCampo="Problema Persiste"
          config={campos.persiste}
          onChange={(novo) =>
            setConfig({
              fields: {
                ...campos,
                persiste: novo,
              },
            })
          }
        />

        <CampoLinha
          nomeCampo="Deseja Retorno"
          config={campos.desejaRetorno}
          onChange={(novo) =>
            setConfig({
              fields: {
                ...campos,
                desejaRetorno: novo,
              },
            })
          }
        />

        <CampoLinha
          nomeCampo="Meio de Contato"
          config={campos.meioContato}
          onChange={(novo) =>
            setConfig({
              fields: {
                ...campos,
                meioContato: novo,
              },
            })
          }
        />
      </div>

      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <div className="space-y-2.5">
          <label className="text-grey-accent text-[11px] font-black tracking-[0.18em] uppercase">
            Opções para tipo de manifestação (uma por linha)
          </label>
          <textarea
            value={opcoesTipoTexto}
            onChange={(e) => setOpcoesTipoTexto(e.target.value)}
            className="border-grey-accent/20 text-deep-charcoal placeholder:text-grey-accent/40 focus:border-accent-blue focus:ring-accent-blue/10 min-h-[120px] w-full rounded-2xl border bg-white px-4 py-3 text-sm font-bold transition-all outline-none focus:ring-4"
          />
        </div>

        <div className="space-y-2.5">
          <label className="text-grey-accent text-[11px] font-black tracking-[0.18em] uppercase">
            Opções para meio de contato (uma por linha)
          </label>
          <textarea
            value={opcoesMeioTexto}
            onChange={(e) => setOpcoesMeioTexto(e.target.value)}
            className="border-grey-accent/20 text-deep-charcoal placeholder:text-grey-accent/40 focus:border-accent-blue focus:ring-accent-blue/10 min-h-[120px] w-full rounded-2xl border bg-white px-4 py-3 text-sm font-bold transition-all outline-none focus:ring-4"
          />
        </div>
      </div>
    </section>
  )
}
