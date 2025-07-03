'use client'

import React from 'react'
import KitCard from './KitCard'

interface Kit {
  id: string
  nome: string
  descricao: string
  preco: number
  imagem: string
}

interface KitGridProps {
  kits: Kit[]
  onSelect?: (id: string) => void
}

const KitGrid: React.FC<KitGridProps> = ({ kits, onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {kits.map((kit) => (
        <KitCard
          key={kit.id}
          id={kit.id}
          nome={kit.nome}
          descricao={kit.descricao}
          preco={kit.preco}
          imagem={kit.imagem}
          onClick={() => onSelect && onSelect(kit.id)}
        />
      ))}
    </div>
  )
}

export default KitGrid
