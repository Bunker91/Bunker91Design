'use client'

import { useEffect } from 'react'

export default function AdminPage() {
  useEffect(() => {
    document.title = 'Painel Administrativo — Bunker 91'
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#1a0000] p-8 text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Painel Administrativo</h1>
        <p className="text-lg text-gray-300 mb-8">
          Bem-vindo, administrador. Aqui você poderá gerenciar seus kits, usuários e configurações do site.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdminCard title="Gerenciar Kits" description="Adicione, edite e remova kits editáveis." />
          <AdminCard title="Usuários & Vendas" description="Veja quem comprou, acesse histórico e envie promoções." />
          <AdminCard title="Aparência do Site" description="Mude as cores, temas e textos fixos do site." />
          <AdminCard title="Relatórios" description="Acompanhe vendas, acessos e engajamento." />
        </div>
      </div>
    </div>
  )
}

function AdminCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-sm hover:scale-[1.02] transition-all duration-200 shadow-md cursor-pointer">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  )
}
