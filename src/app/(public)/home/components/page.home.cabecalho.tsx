'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

import Image from 'next/image'

const itensNavegacao = [
  { nome: 'Sobre', href: '/home#sobre' },
  { nome: 'Atividades', href: '/home#atividades' },
  { nome: 'Projetos', href: '/home#projetos' },
  { nome: 'Transparência', href: '/transparencia' },
]

export default function Cabecalho() {
  const [rolou, setRolou] = useState(false)

  useEffect(() => {
    const lidarComRolagem = () => {
      setRolou(window.scrollY > 20)
    }
    window.addEventListener('scroll', lidarComRolagem)
    return () => window.removeEventListener('scroll', lidarComRolagem)
  }, [])

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${rolou
        ? 'bg-deep-charcoal/80 py-4 shadow-2xl backdrop-blur-xl'
        : 'bg-transparent py-8'
        }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <Link href="/home" className="group flex items-center">
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
      </div>
    </nav>
  )
}
