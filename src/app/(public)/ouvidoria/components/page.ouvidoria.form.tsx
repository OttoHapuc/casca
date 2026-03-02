'use client'

import { useState } from 'react'
import { TipoOuvidoriaConfig } from '@/types/app/ouvidoria'

type Props = {
  config: TipoOuvidoriaConfig
}

type Erros = Partial<Record<string, string>>

function sanitizeTexto(valor: string) {
  return valor.replace(/[<>]/g, '').trim()
}

export default function OuvidoriaForm({ config }: Props) {
  const campos = config.fields

  const [identificar, setIdentificar] = useState<'Sim' | 'Não'>('Sim')
  const [nome, setNome] = useState('')
  const [tipo, setTipo] = useState('')
  const [cidadeServico, setCidadeServico] = useState('')
  const [dataOcorrido, setDataOcorrido] = useState('')
  const [descricao, setDescricao] = useState('')
  const [persiste, setPersiste] = useState<'Sim' | 'Não'>('Não')
  const [desejaRetorno, setDesejaRetorno] = useState<'Sim' | 'Não'>('Não')
  const [meioContato, setMeioContato] = useState<'E-mail' | 'Telefone' | ''>('')
  const [contato, setContato] = useState('')

  const [enviando, setEnviando] = useState(false)
  const [mensagem, setMensagem] = useState<{ texto: string; erro?: boolean } | null>(null)
  const [erros, setErros] = useState<Erros>({})

  const opcoesTipo =
    campos.tipo.options && campos.tipo.options.length > 0
      ? campos.tipo.options
      : ['Reclamação', 'Sugestão', 'Elogio', 'Solicitação', 'Denúncia']

  const opcoesMeio =
    campos.meioContato.options && campos.meioContato.options.length > 0
      ? campos.meioContato.options
      : ['E-mail', 'Telefone']

  function resetarFormulario() {
    setIdentificar('Sim')
    setNome('')
    setTipo('')
    setCidadeServico('')
    setDataOcorrido('')
    setDescricao('')
    setPersiste('Não')
    setDesejaRetorno('Não')
    setMeioContato('')
    setContato('')
    setErros({})
  }

  function validar(): boolean {
    const novosErros: Erros = {}

    if (campos.tipo.enabled && campos.tipo.required && !tipo) {
      novosErros.tipo = 'Selecione o tipo de manifestação.'
    }

    if (campos.cidadeServico.enabled && campos.cidadeServico.required && !cidadeServico) {
      novosErros.cidadeServico = 'Informe a cidade ou serviço relacionado.'
    }

    if (campos.descricao.enabled && campos.descricao.required && !descricao.trim()) {
      novosErros.descricao = 'Descreva a situação.'
    }

    if (descricao.length > 1000) {
      novosErros.descricao = 'A descrição deve ter no máximo 1000 caracteres.'
    }

    if (campos.anonimo.enabled && campos.anonimo.required && !identificar) {
      novosErros.anonimo = 'Informe se deseja se identificar.'
    }

    if (identificar === 'Sim' && campos.nome.enabled && campos.nome.required && !nome) {
      novosErros.nome = 'Informe seu nome ou escolha não se identificar.'
    }

    if (campos.desejaRetorno.enabled && campos.desejaRetorno.required && !desejaRetorno) {
      novosErros.desejaRetorno = 'Informe se deseja receber retorno.'
    }

    if (
      desejaRetorno === 'Sim' &&
      campos.meioContato.enabled &&
      campos.meioContato.required &&
      !meioContato
    ) {
      novosErros.meioContato = 'Selecione o meio de contato preferencial.'
    }

    if (desejaRetorno === 'Sim' && campos.meioContato.enabled && !contato.trim()) {
      novosErros.contato = 'Informe o meio de contato (e-mail, telefone, etc.).'
    }

    if (dataOcorrido) {
      const padraoData = /^\d{2}\/\d{2}\/\d{4}$/
      if (!padraoData.test(dataOcorrido)) {
        novosErros.dataOcorrido = 'Use o formato dd/mm/aaaa.'
      }
    }

    setErros(novosErros)
    return Object.keys(novosErros).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMensagem(null)

    if (enviando) return

    if (!validar()) {
      setMensagem({
        texto: 'Verifique os campos destacados antes de enviar.',
        erro: true,
      })
      return
    }

    setEnviando(true)

    const anonimo = identificar === 'Sim' ? 'Não' : 'Sim'
    const nomeEnviado =
      identificar === 'Sim' && campos.nome.enabled ? sanitizeTexto(nome) || null : null
    const meioContatoEnviado = desejaRetorno === 'Sim' ? meioContato || null : null
    const contatoEnviado =
      desejaRetorno === 'Sim' && campos.meioContato.enabled ? sanitizeTexto(contato) || null : null

    const payload = {
      anonimo,
      nome: nomeEnviado,
      tipo: sanitizeTexto(tipo),
      cidadeServico: sanitizeTexto(cidadeServico),
      dataOcorrido: dataOcorrido ? sanitizeTexto(dataOcorrido) : '',
      descricao: sanitizeTexto(descricao),
      persiste,
      desejaRetorno,
      meioContato: meioContatoEnviado,
      contato: contatoEnviado,
    }

    try {
      const resposta = await fetch('/api/ouvidoria', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const json = await resposta.json().catch(() => null)

      if (!resposta.ok || !json || !json.sucesso) {
        setMensagem({
          texto: json?.mensagem || 'Ocorreu um erro ao enviar sua manifestação. Tente novamente.',
          erro: true,
        })
      } else {
        setMensagem({
          texto: 'Sua manifestação foi registrada com sucesso.',
        })
        resetarFormulario()
      }
    } catch {
      setMensagem({
        texto: 'Ocorreu um erro ao enviar sua manifestação. Tente novamente.',
        erro: true,
      })
    } finally {
      setEnviando(false)
      setTimeout(() => setMensagem(null), 8000)
    }
  }

  return (
    <div className="border-deep-charcoal/5 shadow-deep-charcoal/10 relative overflow-hidden rounded-[3rem] border bg-white/90 p-6 shadow-2xl backdrop-blur-md sm:p-10">
      <div className="bg-primary-yellow/15 absolute -top-40 -left-40 h-64 w-64 rounded-full blur-3xl" />
      <div className="bg-accent-teal/15 absolute -right-40 -bottom-40 h-72 w-72 rounded-full blur-3xl" />

      <div className="relative z-10 space-y-6">
        <div>
          <h2 className="text-deep-charcoal text-2xl font-black tracking-tight uppercase sm:text-3xl">
            Formulário de Ouvidoria
          </h2>
          <p className="text-grey-accent mt-2 text-sm font-medium sm:text-base">
            Use este espaço para registrar reclamações, sugestões, elogios, solicitações ou
            denúncias de forma segura.
          </p>
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

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            {campos.anonimo.enabled && (
              <div className="space-y-2.5">
                <label className="text-accent-blue text-[11px] font-black tracking-[0.18em] uppercase">
                  {campos.anonimo.label}
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIdentificar('Sim')}
                    className={`flex-1 rounded-2xl border px-4 py-3 text-sm font-bold transition-all ${
                      identificar === 'Sim'
                        ? 'border-primary-yellow bg-primary-yellow text-deep-charcoal shadow-sm'
                        : 'border-grey-accent/20 text-grey-accent hover:border-grey-accent/40 bg-white'
                    }`}
                  >
                    Sim
                  </button>
                  <button
                    type="button"
                    onClick={() => setIdentificar('Não')}
                    className={`flex-1 rounded-2xl border px-4 py-3 text-sm font-bold transition-all ${
                      identificar === 'Não'
                        ? 'border-primary-yellow bg-primary-yellow text-deep-charcoal shadow-sm'
                        : 'border-grey-accent/20 text-grey-accent hover:border-grey-accent/40 bg-white'
                    }`}
                  >
                    Não
                  </button>
                </div>
                {erros.anonimo && <p className="text-xs font-bold text-red-500">{erros.anonimo}</p>}
              </div>
            )}

            {campos.nome.enabled && identificar === 'Sim' && (
              <div className="space-y-2.5">
                <label className="text-accent-blue text-[11px] font-black tracking-[0.18em] uppercase">
                  {campos.nome.label}
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="border-grey-accent/20 text-deep-charcoal placeholder:text-grey-accent/40 focus:border-accent-blue focus:ring-accent-blue/10 w-full rounded-2xl border bg-white px-4 py-3 text-sm font-bold transition-all outline-none focus:ring-4"
                  maxLength={200}
                />
                {erros.nome && <p className="text-xs font-bold text-red-500">{erros.nome}</p>}
              </div>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {campos.tipo.enabled && (
              <div className="space-y-2.5">
                <label className="text-accent-blue text-[11px] font-black tracking-[0.18em] uppercase">
                  {campos.tipo.label}
                </label>
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  className="border-grey-accent/20 text-deep-charcoal focus:border-accent-blue focus:ring-accent-blue/10 w-full rounded-2xl border bg-white px-4 py-3 text-sm font-bold transition-all outline-none focus:ring-4"
                >
                  <option value="">Selecione</option>
                  {opcoesTipo.map((op) => (
                    <option key={op} value={op}>
                      {op}
                    </option>
                  ))}
                </select>
                {erros.tipo && <p className="text-xs font-bold text-red-500">{erros.tipo}</p>}
              </div>
            )}

            {campos.cidadeServico.enabled && (
              <div className="space-y-2.5">
                <label className="text-accent-blue text-[11px] font-black tracking-[0.18em] uppercase">
                  {campos.cidadeServico.label}
                </label>
                <input
                  type="text"
                  value={cidadeServico}
                  onChange={(e) => setCidadeServico(e.target.value)}
                  className="border-grey-accent/20 text-deep-charcoal placeholder:text-grey-accent/40 focus:border-accent-blue focus:ring-accent-blue/10 w-full rounded-2xl border bg-white px-4 py-3 text-sm font-bold transition-all outline-none focus:ring-4"
                  maxLength={200}
                />
                {erros.cidadeServico && (
                  <p className="text-xs font-bold text-red-500">{erros.cidadeServico}</p>
                )}
              </div>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {campos.dataOcorrido.enabled && (
              <div className="space-y-2.5">
                <label className="text-accent-blue text-[11px] font-black tracking-[0.18em] uppercase">
                  {campos.dataOcorrido.label}
                </label>
                <input
                  type="text"
                  value={dataOcorrido}
                  onChange={(e) => setDataOcorrido(e.target.value)}
                  placeholder="dd/mm/aaaa"
                  className="border-grey-accent/20 text-deep-charcoal placeholder:text-grey-accent/40 focus:border-accent-blue focus:ring-accent-blue/10 w-full rounded-2xl border bg-white px-4 py-3 text-sm font-bold transition-all outline-none focus:ring-4"
                  maxLength={10}
                />
                {erros.dataOcorrido && (
                  <p className="text-xs font-bold text-red-500">{erros.dataOcorrido}</p>
                )}
              </div>
            )}

            {campos.persiste.enabled && (
              <div className="space-y-2.5">
                <label className="text-accent-blue text-[11px] font-black tracking-[0.18em] uppercase">
                  {campos.persiste.label}
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setPersiste('Sim')}
                    className={`flex-1 rounded-2xl border px-4 py-3 text-sm font-bold transition-all ${
                      persiste === 'Sim'
                        ? 'border-primary-yellow bg-primary-yellow text-deep-charcoal shadow-sm'
                        : 'border-grey-accent/20 text-grey-accent hover:border-grey-accent/40 bg-white'
                    }`}
                  >
                    Sim
                  </button>
                  <button
                    type="button"
                    onClick={() => setPersiste('Não')}
                    className={`flex-1 rounded-2xl border px-4 py-3 text-sm font-bold transition-all ${
                      persiste === 'Não'
                        ? 'border-primary-yellow bg-primary-yellow text-deep-charcoal shadow-sm'
                        : 'border-grey-accent/20 text-grey-accent hover:border-grey-accent/40 bg-white'
                    }`}
                  >
                    Não
                  </button>
                </div>
              </div>
            )}
          </div>

          {campos.descricao.enabled && (
            <div className="space-y-2.5">
              <label className="text-accent-blue text-[11px] font-black tracking-[0.18em] uppercase">
                {campos.descricao.label}
              </label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                maxLength={1000}
                className="border-grey-accent/20 text-deep-charcoal placeholder:text-grey-accent/40 focus:border-accent-blue focus:ring-accent-blue/10 min-h-[160px] w-full rounded-2xl border bg-white px-4 py-3 text-sm font-bold transition-all outline-none focus:ring-4"
                placeholder="Descreva com detalhes o que aconteceu, incluindo datas, locais e pessoas envolvidas se desejar."
              />
              <div className="text-grey-accent flex items-center justify-between text-[11px] font-bold">
                <span>{descricao.length}/1000 caracteres</span>
              </div>
              {erros.descricao && (
                <p className="text-xs font-bold text-red-500">{erros.descricao}</p>
              )}
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            {campos.desejaRetorno.enabled && (
              <div className="space-y-2.5">
                <label className="text-accent-blue text-[11px] font-black tracking-[0.18em] uppercase">
                  {campos.desejaRetorno.label}
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setDesejaRetorno('Sim')}
                    className={`flex-1 rounded-2xl border px-4 py-3 text-sm font-bold transition-all ${
                      desejaRetorno === 'Sim'
                        ? 'border-primary-yellow bg-primary-yellow text-deep-charcoal shadow-sm'
                        : 'border-grey-accent/20 text-grey-accent hover:border-grey-accent/40 bg-white'
                    }`}
                  >
                    Sim
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDesejaRetorno('Não')
                      setMeioContato('')
                      setContato('')
                    }}
                    className={`flex-1 rounded-2xl border px-4 py-3 text-sm font-bold transition-all ${
                      desejaRetorno === 'Não'
                        ? 'border-primary-yellow bg-primary-yellow text-deep-charcoal shadow-sm'
                        : 'border-grey-accent/20 text-grey-accent hover:border-grey-accent/40 bg-white'
                    }`}
                  >
                    Não
                  </button>
                </div>
                {erros.desejaRetorno && (
                  <p className="text-xs font-bold text-red-500">{erros.desejaRetorno}</p>
                )}
              </div>
            )}

            {campos.meioContato.enabled && desejaRetorno === 'Sim' && (
              <div className="space-y-4">
                <div className="space-y-2.5">
                  <label className="text-accent-blue text-[11px] font-black tracking-[0.18em] uppercase">
                    {campos.meioContato.label}
                  </label>
                  <select
                    value={meioContato}
                    onChange={(e) => setMeioContato(e.target.value as 'E-mail' | 'Telefone')}
                    className="border-grey-accent/20 text-deep-charcoal focus:border-accent-blue focus:ring-accent-blue/10 w-full rounded-2xl border bg-white px-4 py-3 text-sm font-bold transition-all outline-none focus:ring-4"
                  >
                    <option value="">Selecione</option>
                    {opcoesMeio.map((op) => (
                      <option key={op} value={op}>
                        {op}
                      </option>
                    ))}
                  </select>
                  {erros.meioContato && (
                    <p className="text-xs font-bold text-red-500">{erros.meioContato}</p>
                  )}
                </div>

                <div className="space-y-2.5">
                  <label className="text-accent-blue text-[11px] font-black tracking-[0.18em] uppercase">
                    Informe o contato (e-mail, telefone, etc.)
                  </label>
                  <input
                    type="text"
                    value={contato}
                    onChange={(e) => setContato(e.target.value)}
                    className="border-grey-accent/20 text-deep-charcoal placeholder:text-grey-accent/40 focus:border-accent-blue focus:ring-accent-blue/10 w-full rounded-2xl border bg-white px-4 py-3 text-sm font-bold transition-all outline-none focus:ring-4"
                    maxLength={200}
                    placeholder="Ex.: seuemail@exemplo.com ou (11) 99999-9999"
                  />
                  {erros.contato && (
                    <p className="text-xs font-bold text-red-500">{erros.contato}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="border-deep-charcoal/10 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
            <p className="text-grey-accent text-[11px] font-medium sm:text-xs">
              As informações serão tratadas com confidencialidade, nos termos da legislação vigente,
              e utilizadas exclusivamente para fins de melhoria dos serviços e controle
              administrativo. O prazo para resposta da Ouvidoria é de até 15 (quinze) dias corridos,
              contados a partir do registro da manifestação, podendo ser prorrogado, de forma
              justificada, quando a complexidade do caso assim exigir.
            </p>
            <button
              type="submit"
              disabled={enviando}
              className="bg-primary-yellow text-deep-charcoal shadow-primary-yellow/30 w-full rounded-2xl px-10 py-4 text-sm font-black shadow-lg transition-all hover:scale-[1.02] hover:bg-yellow-400 active:scale-[0.98] disabled:opacity-60 sm:w-auto sm:text-base"
            >
              {enviando ? 'Enviando...' : 'Enviar Manifestação'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
