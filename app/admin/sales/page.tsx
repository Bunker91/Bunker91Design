// /app/admin/sales/page.tsx

import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface Sale {
  id: string
  user_email: string
  kit_id: string
  price: number
  currency: string
  status: string
  created_at: string
}

export default function AdminSales() {
  const [sales, setSales] = useState<Sale[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSales() {
      const { data, error } = await supabase
        .from('vendas')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao buscar vendas:', error)
        setLoading(false)
        return
      }
      setSales(data || [])
      setLoading(false)
    }
    fetchSales()
  }, [])

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Relatório de Vendas</h1>

      {loading && <p>Carregando vendas...</p>}

      {!loading && sales.length === 0 && <p>Nenhuma venda registrada.</p>}

      {!loading && sales.length > 0 && (
        <table className="w-full table-auto border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-600 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-600 px-4 py-2 text-left">Email do Usuário</th>
              <th className="border border-gray-600 px-4 py-2 text-left">ID do Kit</th>
              <th className="border border-gray-600 px-4 py-2 text-left">Preço</th>
              <th className="border border-gray-600 px-4 py-2 text-left">Moeda</th>
              <th className="border border-gray-600 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-600 px-4 py-2 text-left">Data da Venda</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id} className="even:bg-gray-800 odd:bg-gray-700">
                <td className="border border-gray-600 px-4 py-2">{sale.id}</td>
                <td className="border border-gray-600 px-4 py-2">{sale.user_email}</td>
                <td className="border border-gray-600 px-4 py-2">{sale.kit_id}</td>
                <td className="border border-gray-600 px-4 py-2">R$ {sale.price.toFixed(2)}</td>
                <td className="border border-gray-600 px-4 py-2">{sale.currency}</td>
                <td className="border border-gray-600 px-4 py-2">{sale.status}</td>
                <td className="border border-gray-600 px-4 py-2">{new Date(sale.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
