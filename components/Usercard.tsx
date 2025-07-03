// /components/UserCard.tsx

import React from 'react'

interface UserCardProps {
  email: string
  role?: string
  ativo: boolean
}

export default function UserCard({ email, role = 'usuário', ativo }: UserCardProps) {
  return (
    <div className="border border-gray-700 rounded p-4 bg-gray-800 text-white">
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Função:</strong> {role}</p>
      <p><strong>Status:</strong> {ativo ? 'Ativo' : 'Inativo'}</p>
    </div>
  )
}
