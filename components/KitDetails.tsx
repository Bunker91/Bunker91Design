'use client'

import React from 'react'

interface KitDetailsProps {
  id: string
  nome: string
  descricao: string
  preco: number
  imagem: string
}

const KitDetails: React.FC<KitDetailsProps> = ({ id, nome, descricao, preco, imagem }) => {
  return (
    <div className="max-w-4xl mx-auto bg-gray-900 text-white rounded-lg shadow p-6">
      <img src={imagem} alt={nome} className="w-full h-64 object-cover rounded mb-4" />
      <h2 className="text-3xl font-bold mb-2">{nome}</h2>
      <p className="mb-4 text-gray-300">{descricao}</p>
      <div className="text-2xl font-semibold mb-4">R$ {preco.toFixed(2)}</div>
      <button className="bg-[#770000] px-6 py-2 rounded hover:bg-[#990000] transition">
        Comprar
      </button>
    </div>
  )
}

export default KitDetails
