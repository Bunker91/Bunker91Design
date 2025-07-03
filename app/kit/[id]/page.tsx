'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

type Kit = {
  id: string
  nome: string
  descricao: string
  preco: number
}

export default function KitDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [kit, setKit] = useState<Kit | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchKit() {
      if (!params?.id) {
        alert('ID do kit não encontrado')
        router.push('/kit')
        return
      }
      const { data, error } = await supabase
        .from('kits')
        .select('*')
        .eq('id', params.id)
        .single()

      if (error || !data) {
        alert('Kit não encontrado')
        router.push('/kit')
        return
      }
      setKit(data)
      setLoading(false)
    }
    fetchKit()
  }, [params?.id, router])

  if (loading) return <p>Carregando detalhes do kit...</p>
  if (!kit) return null

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">{kit.nome}</h1>
      <p className="mb-4">{kit.descricao}</p>
      <p className="text-xl font-semibold">Preço: R$ {kit.preco.toFixed(2)}</p>
    </div>
  )
}
