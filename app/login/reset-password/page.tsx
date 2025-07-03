'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  async function handleReset() {
    setLoading(true)
    setMsg('')
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/login',
    })
    setLoading(false)
    if (error) {
      setMsg('Erro: ' + error.message)
      return
    }
    setMsg('Email de recuperação enviado! Verifique sua caixa de entrada.')
    setEmail('')
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">Recuperar Senha</h1>
      <div className="w-full max-w-sm">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-gray-800 border border-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {msg && <p className="mb-4">{msg}</p>}
        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 p-3 rounded"
        >
          {loading ? 'Enviando...' : 'Enviar email'}
        </button>
      </div>
    </div>
  )
}
