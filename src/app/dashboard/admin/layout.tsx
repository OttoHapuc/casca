'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  Globe,
  LogOut,
  Award,
  Paperclip,
  MessageCircle,
} from 'lucide-react'

import Image from 'next/image'

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
                  className={`flex items-center space-x-3 rounded-2xl px-5 py-4 text-sm font-bold transition-all ${
                    isActive
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

          <button className="mt-auto flex items-center space-x-3 rounded-2xl px-5 py-4 text-sm font-bold text-red-300 transition-all hover:bg-red-500/10 hover:text-red-400">
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
