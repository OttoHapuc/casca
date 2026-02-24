'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FileText, Globe, LogOut, Award, Paperclip } from 'lucide-react'

import Image from 'next/image'

const navItems = [
    { name: 'Painel Geral', href: '/dashboard/admin', icon: LayoutDashboard },
    { name: 'Gestão de Conteúdo', href: '/dashboard/admin#conteudo', icon: Globe },
    { name: 'Transparência', href: '/dashboard/admin#transparencia', icon: FileText },
    { name: 'Certificações', href: '/dashboard/admin#certificacoes', icon: Award },
    { name: 'Anexos por Cidade', href: '/dashboard/admin#anexos', icon: Paperclip },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    return (
        <div className="flex min-h-screen bg-light-cream font-lato">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-deep-charcoal transition-all duration-300 shadow-2xl shadow-deep-charcoal/20">
                <div className="flex h-full flex-col p-8">
                    <div className="mb-12">
                        <Link href="/home" className="flex flex-col space-y-2 items-center">
                            <Image
                                src="/logo2.jpg"
                                alt="C.A.S.C.A. Logo"
                                width={160}
                                height={60}
                                className="w-24 drop-shadow-md rounded-full transition-transform duration-300 hover:scale-105"
                            />
                            <span className="w-fit rounded-md bg-white/10 px-2 py-1 text-[10px] font-black uppercase text-white/50 tracking-widest">
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
                                        ? 'bg-gradient-to-r from-primary-yellow to-yellow-500 text-deep-charcoal shadow-md shadow-primary-yellow/10'
                                        : 'text-white/60 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    <item.icon size={20} className={isActive ? 'text-deep-charcoal' : 'text-grey-accent'} />
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
            <main className="ml-72 flex-1 p-12 relative overflow-hidden">
                {/* Decorative background orbs */}
                <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-accent-blue/5 blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-primary-yellow/5 blur-[100px] pointer-events-none" />

                <header className="mb-12 flex items-center justify-between relative z-10">
                    <div>
                        <h1 className="text-3xl font-black text-deep-charcoal uppercase tracking-tight">
                            Dashboard <span className="bg-gradient-to-r from-primary-yellow to-yellow-500 bg-clip-text text-transparent">Admin</span>
                        </h1>
                        <p className="text-sm font-medium text-grey-accent mt-1">
                            Gerencie o conteúdo e a transparência da instituição.
                        </p>
                    </div>
                    <div className="flex items-center space-x-4 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-3xl border border-grey-accent/10 shadow-sm">
                        <div className="text-right">
                            <div className="text-sm font-black text-deep-charcoal">Administrador</div>
                            <div className="text-xs font-bold text-accent-blue uppercase tracking-widest">Acesso Total</div>
                        </div>
                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary-yellow to-yellow-400 p-0.5 shadow-lg shadow-primary-yellow/20">
                            <div className="flex h-full w-full items-center justify-center rounded-[0.8rem] bg-white text-lg font-black text-deep-charcoal">
                                A
                            </div>
                        </div>
                    </div>
                </header>

                <div className="relative z-10">
                    {children}
                </div>
            </main>
        </div>
    )
}
