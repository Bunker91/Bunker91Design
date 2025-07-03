// /components/KitForm.tsx

'use client'

import { useState } from 'react'

interface KitFormProps {
  onSubmit: (data: any) => void
  initialData?: {
    name: string
    price: number
    description: string
  }
}

export default function KitForm({ onSubmit, initialData }: KitFormProps) {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    price: 0,
    description: ''
  })

  function handleChange(key: string, value: string | number) {
    setFormData({ ...formData, [key]: value })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-6 rounded text-white">
      <input
        type="text"
        placeholder="Nome do Kit"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        className="w-full p-2 rounded bg-gray-900 border border-gray-700"
      />
      <input
        type="number"
        placeholder="Preço"
        value={formData.price}
        onChange={(e) => handleChange('price', parseFloat(e.target.value))}
        className="w-full p-2 rounded bg-gray-900 border border-gray-700"
      />
      <textarea
        placeholder="Descrição"
        value={formData.description}
        onChange={(e) => handleChange('description', e.target.value)}
        className="w-full p-2 rounded bg-gray-900 border border-gray-700"
      />

      <button type="submit" className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded">
        Salvar
      </button>
    </form>
  )
}
