// /app/admin/notifications/page.tsx

'use client'

import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import NotificationItem from '@/components/NotificationItem'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Notification {
  id: string
  title: string
  message: string
  created_at: string
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchNotifications()
  }, [])

  async function fetchNotifications() {
    const { data, error } = await supabase
      .from('notificacoes')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error(error)
      return
    }

    setNotifications(data || [])
  }

  async function sendNotification(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from('notificacoes').insert([
      {
        title,
        message
      }
    ])

    if (error) {
      alert('Erro ao enviar notificação')
      setLoading(false)
      return
    }

    setTitle('')
    setMessage('')
    await fetchNotifications()
    setLoading(false)
  }

  return (
    <div className="p-6 text-white min-h-screen bg-gray-900">
      <h1 className="text-3xl font-bold mb-6">Notificações</h1>
      {notificacoes.map((notificacao) => (
  <NotificationItem key={notificacao.id} {...notificacao} />
))}

      <form onSubmit={sendNotification} className="mb-8 space-y-4 max-w-xl">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400"
        />
        <textarea
          placeholder="Mensagem"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 h-32"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded text-white font-semibold"
        >
          {loading ? 'Enviando...' : 'Enviar Notificação'}
        </button>
      </form>

      <h2 className="text-2xl mb-4">Histórico</h2>
      <ul className="space-y-3">
        {notifications.map((n) => (
          <li key={n.id} className="p-4 bg-gray-800 rounded">
            <p className="text-sm text-red-400 font-bold">{n.title}</p>
            <p className="text-white">{n.message}</p>
            <p className="text-xs text-gray-400">{new Date(n.created_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
