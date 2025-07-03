'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://besntryyclwztpuhmxcy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlc250cnl5Y2x3enRwdWhteGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1MTExMDYsImV4cCI6MjA2NzA4NzEwNn0.ub8ijuk62Jw2XC7OZGmIu2dNeCCPVWWxnARgqB_49oM'
)

type Venda = {
  id: string
  user_id: string
  kit_id: string
  status: string
  valor: number
  moeda: string
  criado_em: string | null
}

export default function AdminVendasPage() {
  const [vendas, setVendas] = useState<Venda[]>([])
  const [loading, setLoading] = useState(true)

  async function carregarVendas() {
    setLoading(true)
    const { data, error } = await supabase
      .from('vendas')
      .select('*')
      .order('criado_em', { ascending: false })

    if (error) {
      alert('Erro ao carregar vendas: ' + error.message)
      return
    }

    setVendas(data || [])
    setLoading(false)
  }

  async function atualizarStatus(id: string, novoStatus: string) {
    const { error } = await supabase
      .from('vendas')
      .update({ status: novoStatus })
      .eq('id', id)

    if (error) {
      alert('Erro ao atualizar status: ' + error.message)
    } else {
      alert('Status atualizado com sucesso!')
      carregarVendas()
    }
  }

  async function excluirVenda(id: string) {
    const confirmar = confirm('Tem certeza que deseja excluir esta venda?')
    if (!confirmar) return

    const { error } = await supabase
      .from('vendas')
      .delete()
      .eq('id', id)

    if (error) {
      alert('Erro ao excluir: ' + error.message)
    } else {
      alert('Venda excluída!')
      carregarVendas()
    }
  }

  useEffect(() => {
    carregarVendas()
  }, [])

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Painel de Vendas</h1>

      {loading && <p>Carregando vendas...</p>}

      {!loading && vendas.length === 0 && (
        <p>Nenhuma venda registrada até agora.</p>
      )}

      {!loading && vendas.length > 0 && (
        <div className="space-y-4">
          {vendas.map((venda) => (
            <div
              key={venda.id}
              className="border border-gray-700 rounded-lg p-4 bg-gray-800 flex flex-col md:flex-row md:justify-between md:items-center"
            >
              <div className="mb-4 md:mb-0">
                <p><strong>ID:</strong> {venda.id}</p>
                <p><strong>User ID:</strong> {venda.user_id}</p>
                <p><strong>Kit ID:</strong> {venda.kit_id}</p>
                <p><strong>Valor:</strong> {venda.valor.toFixed(2)} {venda.moeda}</p>
                <p><strong>Status:</strong> {venda.status}</p>
                <p><strong>Data:</strong> {new Date(venda.criado_em || '').toLocaleString()}</p>
              </div>

              <div className="flex gap-2">
                <select
                  value={venda.status}
                  onChange={(e) => atualizarStatus(venda.id, e.target.value)}
                  className="bg-gray-700 text-white px-3 py-1 rounded"
                >
                  <option value="pendente">Pendente</option>
                  <option value="pago">Pago</option>
                  <option value="cancelado">Cancelado</option>
                </select>
                <button
                  onClick={() => excluirVenda(venda.id)}
                  className="bg-red-700 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
