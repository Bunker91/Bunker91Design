// /components/ConfigForm.tsx

'use client'

import { useState } from 'react'

interface ConfigFormProps {
  initialValues: { [key: string]: string }
  onSave: (data: { [key: string]: string }) => void
}

export default function ConfigForm({ initialValues, onSave }: ConfigFormProps) {
  const [formData, setFormData] = useState(initialValues)

  function handleChange(key: string, value: string) {
    setFormData({ ...formData, [key]: value })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-6 rounded">
      {Object.entries(formData).map(([key, value]) => (
        <div key={key}>
          <label className="block text-white mb-1 capitalize">{key}</label>
          <input
            className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700"
            value={value}
            onChange={(e) => handleChange(key, e.target.value)}
          />
        </div>
      ))}

      <button
        type="submit"
        className="bg-green-700 px-4 py-2 rounded hover:bg-green-600 text-white"
      >
        Salvar Configurações
      </button>
    </form>
  )
}
