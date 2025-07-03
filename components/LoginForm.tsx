// /components/LoginForm.tsx

'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      alert('Erro: ' + error.message)
    } else {
      router.push('/admin')
    }
  }

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto mt-20 p-6 bg-gray-900 text-white rounded space-y-4">
      <h2 className="text-xl font-bold">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 rounded bg-gray-800 border border-gray-600"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        className="w-full p-2 rounded bg-gray-800 border border-gray-600"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="w-full bg-red-700 hover:bg-red-600 p-2 rounded">
        Entrar
      </button>
    </form>
  )
}
