'use client'

import React from 'react'
import Link from 'next/link'

const AdminPanel = () => {
  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/kits" className="bg-[#770000] p-6 rounded shadow hover:bg-[#990000] transition">
          <h2 className="text-xl font-bold">Gerenciar Kits</h2>
          <p className="text-sm mt-2">Adicione, edite e remova kits</p>
        </Link>

        <Link href="/admin/vendas" className="bg-[#770000] p-6 rounded shadow hover:bg-[#990000] transition">
          <h2 className="text-xl font-bold">Vendas</h2>
          <p className="text-sm mt-2">Veja todas as vendas registradas</p>
        </Link>

        <Link href="/admin/users" className="bg-[#770000] p-6 rounded shadow hover:bg-[#990000] transition">
          <h2 className="text-xl font-bold">Usuários</h2>
          <p className="text-sm mt-2">Visualize e gerencie os usuários</p>
        </Link>
      </div>
    </div>
  )
}

export default AdminPanel
