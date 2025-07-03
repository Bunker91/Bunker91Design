'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  'https://besntryyclwztpuhmxcy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlc250cnl5Y2x3enRwdWhteGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1MTExMDYsImV4cCI6MjA2NzA4NzEwNn0.ub8ijuk62Jw2XC7OZGmIu2dNeCCPVWWxnARgqB_49oM'
)

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()

      if (!data.session || data.session.user.email !== 'bunker91design@gmail.com') {
        router.push('/')
      } else {
        setSession(data.session)
      }
      setLoading(false)
    }

    checkSession()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) return <div className="text-white p-10">Verificando acesso...</div>

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Menu lateral */}
      <aside className="w-64 bg-gradient-to-b from-black via-[#330000] to-black p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-8">Bunker 91 Admin</h1>

        <nav className="flex flex-col space-y-4 flex-1">
          <Link
            href="/admin"
            className={`block px-4 py-2 rounded hover:bg-[#550000] ${
              pathname === '/admin' ? 'bg-[#770000]' : ''
            }`}
          >
            Dashboard
          </Link>

          <Link
            href="/admin/kits"
            className={`block px-4 py-2 rounded hover:bg-[#550000] ${
              pathname === '/admin/kits' ? 'bg-[#770000]' : ''
            }`}
          >
            Kits
          </Link>

          <Link
            href="/admin/users"
            className={`block px-4 py-2 rounded hover:bg-[#550000] ${
              pathname === '/admin/users' ? 'bg-[#770000]' : ''
            }`}
          >
            Usuários
          </Link>

          <Link
            href="/admin/config"
            className={`block px-4 py-2 rounded hover:bg-[#550000] ${
              pathname === '/admin/config' ? 'bg-[#770000]' : ''
            }`}
          >
            Configurações
          </Link>

          <Link
            href="/admin/vendas"
            className={`block px-4 py-2 rounded hover:bg-[#550000] ${
              pathname === '/admin/vendas' ? 'bg-[#770000]' : ''
            }`}
          >
            Vendas
          </Link>
        </nav>

        {/* Botão de logout */}
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-700 hover:bg-red-600 px-4 py-2 rounded"
        >
          Sair
        </button>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 p-10 overflow-auto">{children}</main>
    </div>
  )
}
