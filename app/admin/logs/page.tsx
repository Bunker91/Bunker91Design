// /app/admin/logs/page.tsx

'use client'

import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import LogItem from '@/components/LogItem'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Log {
  id: string
  action: string
  admin_email: string
  created_at: string
}

export default function LogsPage() {
  const [logs, setLogs] = useState<Log[]>([])

  useEffect(() => {
    async function fetchLogs() {
      const { data, error } = await supabase
        .from('logs')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error(error)
        return
      }

      setLogs(data || [])
    }

    fetchLogs()
  }, [])

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Logs do Admin</h1>
      <table className="w-full table-auto border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-800">
            <th className="border border-gray-600 px-4 py-2 text-left">Ação</th>
            <th className="border border-gray-600 px-4 py-2 text-left">Administrador</th>
            <th className="border border-gray-600 px-4 py-2 text-left">Data</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
  <LogItem key={log.id} log={log} />
))}
          {logs.map((log) => (
            <tr key={log.id} className="even:bg-gray-800 odd:bg-gray-700">
              <td className="border border-gray-600 px-4 py-2">{log.action}</td>
              <td className="border border-gray-600 px-4 py-2">{log.admin_email}</td>
              <td className="border border-gray-600 px-4 py-2">
                {new Date(log.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
