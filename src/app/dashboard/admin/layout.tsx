'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FileText, Globe, LogOut } from 'lucide-react'

const navItems = [
    { name: 'Painel Geral', href: '/dashboard/admin', icon: LayoutDashboard },
    { name: 'Gestão de Conteúdo', href: '/dashboard/admin#conteudo', icon: Globe },
    { name: 'Relatórios', href: '/dashboard/admin#relatorios', icon: FileText },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    return (
        <div className="flex min-h-screen bg-[#fcfcf7] font-lato">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-deep-charcoal transition-all duration-300">
                <div className="flex h-full flex-col p-8">
                    <div className="mb-12">
                        <Link href="/home" className="flex items-center space-x-2">
                            <span className="text-2xl font-black tracking-tighter text-white">
                                C.A.S.C.A<span className="text-primary-yellow">.</span>
                            </span>
                            <span className="rounded-md bg-white/5 px-2 py-1 text-[10px] font-black uppercase text-white/40">
                                Admin
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
                                            ? 'bg-primary-yellow text-deep-charcoal'
                                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    <item.icon size={20} />
                                    <span>{item.name}</span>
                                </Link>
                            )
                        })}
                    </nav>

                    <button className="mt-auto flex items-center space-x-3 rounded-2xl px-5 py-4 text-sm font-bold text-red-400/60 transition-all hover:bg-red-400/5 hover:text-red-400">
                        <LogOut size={20} />
                        <span>Sair do Painel</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-72 flex-1 p-12">
                <header className="mb-12 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black text-deep-charcoal uppercase tracking-tight">
                            Dashboard <span className="text-primary-yellow">Admin</span>
                        </h1>
                        <p className="text-sm font-medium text-grey-accent">
                            Gerencie o conteúdo e a transparência da instituição.
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <div className="text-sm font-black text-deep-charcoal">Administrador</div>
                            <div className="text-xs font-bold text-grey-accent capitalize">Nível Acesso Total</div>
                        </div>
                        <div className="h-12 w-12 rounded-2xl bg-primary-yellow p-0.5 shadow-lg">
                            <div className="flex h-full w-full items-center justify-center rounded-[0.8rem] bg-deep-charcoal text-lg font-black text-white">
                                A
                            </div>
                        </div>
                    </div>
                </header>

                <div className="relative">
                    {/* Decorative background orbs */}
                    <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary-yellow/5 blur-[100px]" />
                    <div className="relative z-10">{children}</div>
                </div>
            </main>
        </div>
    )
}
