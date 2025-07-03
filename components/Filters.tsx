'use client'

import React from 'react'

interface FiltersProps {
  status: string
  setStatus: (status: string) => void
}

const Filters: React.FC<FiltersProps> = ({ status, setStatus }) => {
  return (
    <div className="flex items-center space-x-4 mb-4">
      <label className="text-white">Filtrar por status:</label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="bg-gray-800 text-white px-4 py-2 rounded"
      >
        <option value="">Todos</option>
        <option value="pendente">Pendente</option>
        <option value="pago">Pago</option>
        <option value="cancelado">Cancelado</option>
      </select>
    </div>
  )
}

export default Filters
