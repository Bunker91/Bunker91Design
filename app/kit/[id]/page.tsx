'use client'

import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

type Kit = {
  id: string
  nome: string
  descricao: string
  preco: number
}

export default function KitListPage() {
  const [kits, setKits] = useState<Kit[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchKits() {
      const { data, error } = await supabase.from('kits').select('*')
      if (error) {
        alert('Erro ao carregar kits: ' + error.message)
        setLoading(false)
        return
      }
      setKits(data || [])
      setLoading(false)
    }
    fetchKits()
  }, [])

  if (loading) return <p>Carregando kits...</p>
  if (kits.length === 0) return <p>Nenhum kit disponível.</p>

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Lista de Kits</h1>
      <ul>
        {kits.map((kit) => (
          <li key={kit.id} className="mb-4 border border-gray-700 p-4 rounded">
            <Link href={`/kit/${kit.id}`}>
              <h2 className="text-xl font-semibold hover:underline">{kit.nome}</h2>
            </Link>
            <p>{kit.descricao}</p>
            <p>Preço: R$ {kit.preco.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
