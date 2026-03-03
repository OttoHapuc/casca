'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

import {
  LayoutDashboard,
  FileText,
  Globe,
  LogOut,
  Award,
  Paperclip,
  MessageCircle,
  Lock,
} from 'lucide-react'

import Image from 'next/image'
import { validarSenhaAdmin, verificarAcesso, sairPainelAdmin } from '@/actions/page-action.admin.auth'

const navItems = [
  { name: 'Painel Geral', href: '/dashboard/admin', icon: LayoutDashboard },
  { name: 'Gestão de Conteúdo', href: '/dashboard/admin#conteudo', icon: Globe },
  { name: 'Transparência', href: '/dashboard/admin#transparencia', icon: FileText },
  { name: 'Certificações', href: '/dashboard/admin#certificacoes', icon: Award },
  { name: 'Anexos por Cidade', href: '/dashboard/admin#anexos', icon: Paperclip },
  { name: 'Ouvidoria', href: '/dashboard/admin#ouvidoria', icon: MessageCircle },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const [autenticado, setAutenticado] = useState<boolean | null>(null)
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    verificarAcesso().then(setAutenticado)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setCarregando(true)
    setErro('')

    const resposta = await validarSenhaAdmin(senha)

    if (resposta.sucesso) {
      setAutenticado(true)
    } else {
      setErro(resposta.mensagem || 'Acesso negado')
    }

    setCarregando(false)
  }

  const handleLogout = async () => {
    await sairPainelAdmin()
    setAutenticado(false)
  }

  if (autenticado === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-light-cream">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-yellow border-t-transparent"></div>
      </div>
    )
  }

  if (!autenticado) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-light-cream">
        <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-2xl">
          <div className="mb-8 flex flex-col items-center">
            <Image
              src="/logo2.jpg"
              alt="C.A.S.C.A. Logo"
              width={160}
              height={60}
              className="mb-4 w-24 rounded-full drop-shadow-md"
            />
            <h1 className="text-2xl font-black text-deep-charcoal text-center">
              Restrito a Administradores
            </h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-500">Palavra Chave</label>
              <div className="relative">
                <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Digite a senha de administrador"
                  className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 py-4 pl-12 pr-4 text-deep-charcoal transition-all placeholder:text-slate-400 focus:border-primary-yellow focus:bg-white focus:outline-none"
                  required
                />
              </div>
              {erro && <p className="mt-2 text-sm font-semibold text-red-500">{erro}</p>}
            </div>

            <button
              type="submit"
              disabled={carregando}
              className="w-full rounded-2xl bg-primary-yellow py-4 font-black uppercase tracking-widest text-deep-charcoal shadow-lg shadow-primary-yellow/30 transition-all hover:bg-yellow-400 active:scale-[0.98] disabled:opacity-50"
            >
              {carregando ? 'Validando...' : 'Acessar Painel'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-light-cream font-lato flex min-h-screen">
      {/* Sidebar */}
      <aside className="bg-deep-charcoal shadow-deep-charcoal/20 fixed inset-y-0 left-0 z-50 w-72 shadow-2xl transition-all duration-300">
        <div className="flex h-full flex-col p-8">
          <div className="mb-12">
            <Link href="/home" className="flex flex-col items-center space-y-2">
              <Image
                src="/logo2.jpg"
                alt="C.A.S.C.A. Logo"
                width={160}
                height={60}
                className="w-24 rounded-full drop-shadow-md transition-transform duration-300 hover:scale-105"
              />
              <span className="w-fit rounded-md bg-white/10 px-2 py-1 text-[10px] font-black tracking-widest text-white/50 uppercase">
                Painel Administrativo
              </span>
            </Link>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 rounded-2xl px-5 py-4 text-sm font-bold transition-all ${isActive
                      ? 'from-primary-yellow text-deep-charcoal shadow-primary-yellow/10 bg-gradient-to-r to-yellow-500 shadow-md'
                      : 'text-white/60 hover:bg-white/10 hover:text-white'
                    }`}
                >
                  <item.icon
                    size={20}
                    className={isActive ? 'text-deep-charcoal' : 'text-grey-accent'}
                  />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          <button
            onClick={handleLogout}
            className="mt-auto flex items-center space-x-3 rounded-2xl px-5 py-4 text-sm font-bold text-red-300 transition-all hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={20} />
            <span>Sair do Painel</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="relative ml-72 flex-1 overflow-hidden p-12">
        {/* Decorative background orbs */}
        <div className="bg-accent-blue/5 pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] rounded-full blur-[120px]" />
        <div className="bg-primary-yellow/5 pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full blur-[100px]" />

        <header className="relative z-10 mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-deep-charcoal text-3xl font-black tracking-tight uppercase">
              Dashboard{' '}
              <span className="from-primary-yellow bg-gradient-to-r to-yellow-500 bg-clip-text text-transparent">
                Admin
              </span>
            </h1>
            <p className="text-grey-accent mt-1 text-sm font-medium">
              Gerencie o conteúdo e a transparência da instituição.
            </p>
          </div>
          <div className="border-grey-accent/10 flex items-center space-x-4 rounded-3xl border bg-white/80 px-6 py-3 shadow-sm backdrop-blur-sm">
            <div className="text-right">
              <div className="text-deep-charcoal text-sm font-black">Administrador</div>
              <div className="text-accent-blue text-xs font-bold tracking-widest uppercase">
                Acesso Total
              </div>
            </div>
            <div className="from-primary-yellow shadow-primary-yellow/20 h-12 w-12 rounded-2xl bg-gradient-to-br to-yellow-400 p-0.5 shadow-lg">
              <div className="text-deep-charcoal flex h-full w-full items-center justify-center rounded-[0.8rem] bg-white text-lg font-black">
                A
              </div>
            </div>
          </div>
        </header>

        <div className="relative z-10">{children}</div>
      </main>
    </div>
  )
}
