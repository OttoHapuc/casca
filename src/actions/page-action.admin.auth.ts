'use server'

import { cookies } from 'next/headers'

const ADMIN_PASSWORD = 'cascaSocial2026!@#'
const COOKIE_NAME = 'casca_admin_session'

export async function validarSenhaAdmin(senha: string) {
    if (senha === ADMIN_PASSWORD) {
        const cookieStore = await cookies()
        cookieStore.set(COOKIE_NAME, 'authenticated', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 1, // 1 dia
        })
        return { sucesso: true }
    }

    return { sucesso: false, mensagem: 'Senha incorreta' }
}

export async function verificarAcesso() {
    const cookieStore = await cookies()
    const session = cookieStore.get(COOKIE_NAME)
    return session?.value === 'authenticated'
}

export async function sairPainelAdmin() {
    const cookieStore = await cookies()
    cookieStore.delete(COOKIE_NAME)
    return { sucesso: true }
}
