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
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        rolou || isMobileMenuOpen
          ? 'border-light-cream border-b bg-white/90 py-4 shadow-xl backdrop-blur-xl'
          : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <Link
          href="/home"
          className="group flex items-center"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <Image
            src="/logo2.jpg"
            alt="C.A.S.C.A. Logo"
            width={180}
            height={60}
            className="h-14 w-auto rounded-full drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center space-x-1 md:flex">
          {itensNavegacao.map((item) => (
            <Link
              key={item.nome}
              href={item.href}
              className={`rounded-full px-5 py-2 text-sm font-bold transition-all ${rolou ? 'text-deep-charcoal hover:bg-light-cream hover:text-accent-blue' : 'text-deep-charcoal/80 hover:text-accent-blue hover:bg-white/50'}`}
            >
              {item.nome}
            </Link>
          ))}
          <div className={`ml-4 h-6 w-px ${rolou ? 'bg-grey-accent/20' : 'bg-deep-charcoal/10'}`} />
          <a
            href="https://treinamentos.casca.ong.br/"
            target="_blank"
            rel="noreferrer"
            className="bg-primary-yellow text-deep-charcoal hover:shadow-primary-yellow/30 ml-4 rounded-full px-6 py-2.5 text-sm font-black shadow-sm transition-all hover:scale-105 hover:shadow-md active:scale-95"
          >
            Treinamentos
          </a>
          <Link
            href="mailto:contato@casca.tatyverri.com"
            className="bg-primary-yellow text-deep-charcoal hover:shadow-primary-yellow/30 ml-2 rounded-full px-6 py-2.5 text-sm font-black shadow-sm transition-all hover:scale-105 hover:shadow-md active:scale-95"
          >
            Fale Conosco
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden ${rolou ? 'text-deep-charcoal' : 'text-deep-charcoal/80'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="border-light-cream absolute top-full left-0 w-full border-b bg-white/95 shadow-2xl backdrop-blur-xl md:hidden">
          <div className="flex flex-col space-y-4 px-6 py-8">
            {itensNavegacao.map((item) => (
              <Link
                key={item.nome}
                href={item.href}
                className="text-deep-charcoal/80 hover:text-accent-blue text-lg font-bold transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.nome}
              </Link>
            ))}
            <a
              href="https://treinamentos.casca.ong.br/"
              target="_blank"
              rel="noreferrer"
              className="bg-primary-yellow text-deep-charcoal mt-4 w-full rounded-2xl py-4 text-center text-lg font-black shadow-sm transition-all hover:scale-105 active:scale-95"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Treinamentos
            </a>
            <div className="bg-grey-accent/10 my-4 h-px w-full" />
            <Link
              href="mailto:contato@casca.tatyverri.com"
              className="bg-primary-yellow text-deep-charcoal mt-2 w-full rounded-2xl py-4 text-center text-lg font-black shadow-sm transition-all hover:scale-105 active:scale-95"
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
