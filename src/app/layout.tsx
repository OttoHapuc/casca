import type { Metadata } from 'next'
import { Lato, Rubik } from 'next/font/google'
import './globals.css'

const lato = Lato({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-lato',
})

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
})

export const metadata: Metadata = {
  title: 'C.A.S.C.A - Centro de Atendimento Social à Criança e ao Adolescente',
  description: 'Projetos e assistência social para crianças e adolescentes em Tremembé/SP.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${lato.variable} ${rubik.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
