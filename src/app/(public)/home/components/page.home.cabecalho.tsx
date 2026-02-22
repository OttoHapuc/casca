'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

const itensNavegacao = [
  { nome: 'Sobre', href: '/home#sobre' },
  { nome: 'Atividades', href: '/home#atividades' },
  { nome: 'Projetos', href: '/home#projetos' },
  { nome: 'Transparência', href: '/transparencia' },
]

export default function Cabecalho() {
  const [rolou, setRolou] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const lidarComRolagem = () => {
      setRolou(window.scrollY > 20)
    }
    window.addEventListener('scroll', lidarComRolagem)
    return () => window.removeEventListener('scroll', lidarComRolagem)
  }, [])

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${rolou || isMobileMenuOpen
        ? 'bg-deep-charcoal/90 py-4 shadow-2xl backdrop-blur-xl'
        : 'bg-transparent py-8'
        }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <Link href="/home" className="group flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
          <Image
            src="/logo2.jpg"
            alt="C.A.S.C.A. Logo"
            width={180}
            height={60}
            className="h-14 w-auto drop-shadow-lg rounded-full transition-transform duration-300 group-hover:scale-110"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center space-x-1 md:flex">
          {itensNavegacao.map((item) => (
            <Link
              key={item.nome}
              href={item.href}
              className="rounded-full px-5 py-2 text-sm font-bold text-white/70 transition-all hover:bg-white/10 hover:text-white"
            >
              {item.nome}
            </Link>
          ))}
          <div className="ml-4 h-6 w-px bg-white/10" />
          <Link
            href="mailto:contato@casca.tatyverri.com"
            className="ml-4 rounded-full bg-primary-yellow px-6 py-2.5 text-sm font-black text-deep-charcoal transition-all hover:scale-105 active:scale-95"
          >
            Fale Conosco
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="text-white md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 top-full w-full bg-deep-charcoal/95 border-t border-white/10 shadow-2xl backdrop-blur-xl md:hidden">
          <div className="flex flex-col space-y-4 px-6 py-8">
            {itensNavegacao.map((item) => (
              <Link
                key={item.nome}
                href={item.href}
                className="text-lg font-bold text-white/80 transition-colors hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.nome}
              </Link>
            ))}
            <div className="my-4 h-px w-full bg-white/10" />
            <Link
              href="mailto:contato@casca.tatyverri.com"
              className="mt-2 w-full rounded-2xl bg-primary-yellow py-4 text-center text-lg font-black text-deep-charcoal transition-all active:scale-95"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Fale Conosco
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
