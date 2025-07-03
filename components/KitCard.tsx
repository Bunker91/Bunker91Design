'use client'

import React from 'react'

interface KitCardProps {
  id: string
  nome: string
  descricao: string
  preco: number
  imagem: string
  onClick?: () => void
}

const KitCard: React.FC<KitCardProps> = ({ id, nome, descricao, preco, imagem, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-gray-900 text-white rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
    >
      <img src={imagem} alt={nome} className="w-full h-48 object-cover" />

      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{nome}</h3>
        <p className="text-sm text-gray-400 mb-4">{descricao}</p>
        <div className="font-bold text-lg">R$ {preco.toFixed(2)}</div>
      </div>
    </div>
  )
}

export default KitCard
