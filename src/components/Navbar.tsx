'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const navItems = [
  { name: 'C.A.S.C.A', href: '/#sobre' },
  { name: 'Atividades', href: '/#atividades' },
  { name: 'Projetos', href: '/#projetos' },
  { name: 'Transparência', href: '/transparencia' },
  { name: 'Contato', href: '/#contato' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-deep-charcoal/80 py-4 shadow-lg backdrop-blur-md' : 'bg-transparent py-6'}`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <Link href="/" className="text-2xl font-black tracking-tighter text-white">
          C.A.S.C.A<span className="text-primary-yellow">.</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center space-x-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:text-primary-yellow text-sm font-medium text-white/80 transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="mailto:contato@casca.tatyverri.com"
            className="bg-primary-yellow text-deep-charcoal rounded-full px-6 py-2 text-sm font-bold transition-transform hover:scale-105 active:scale-95"
          >
            Fale Conosco
          </Link>
        </div>

        {/* Mobile menu button could be added here */}
      </div>
    </nav>
  )
}
