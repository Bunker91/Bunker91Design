'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://besntryyclwztpuhmxcy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlc250cnl5Y2x3enRwdWhteGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1MTExMDYsImV4cCI6MjA2NzA4NzEwNn0.ub8ijuk62Jw2XC7OZGmIu2dNeCCPVWWxnARgqB_49oM'
)

type Usuario = {
  id: string
  nome: string
  email: string
  ativo: boolean
  role: string
}

export default function AdminUsersPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)

  // estados do form/modal
  const [modalOpen, setModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<Usuario | null>(null)
  const [form, setForm] = useState<Omit<Usuario, 'id'>>({
    nome: '',
    email: '',
    ativo: true,
    role: 'user',
  })

  // busca usuários
  const fetchUsuarios = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('usuarios').select('*').order('nome')
    if (error) {
      alert('Erro ao buscar usuários: ' + error.message)
      setLoading(false)
      return
    }
    setUsuarios(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchUsuarios()
  }, [])

  // abrir modal para criar novo usuário
  const openNewUserModal = () => {
    setEditingUser(null)
    setForm({
      nome: '',
      email: '',
      ativo: true,
      role: 'user',
    })
    setModalOpen(true)
  }

  // abrir modal para editar usuário
  const openEditUserModal = (user: Usuario) => {
    setEditingUser(user)
    setForm({
      nome: user.nome,
      email: user.email,
      ativo: user.ativo,
      role: user.role,
    })
    setModalOpen(true)
  }

  // alterar form
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setForm(prev => ({ ...prev, [name]: checked }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  // salvar usuário
  const saveUser = async () => {
    if (!form.nome.trim() || !form.email.trim()) {
      alert('Nome e email são obrigatórios')
      return
    }

    if (editingUser) {
      // update
      const { error } = await supabase
        .from('usuarios')
        .update({
          nome: form.nome,
          email: form.email,
          ativo: form.ativo,
          role: form.role,
        })
        .eq('id', editingUser.id)
      if (error) {
        alert('Erro ao atualizar usuário: ' + error.message)
        return
      }
    } else {
      // create
      const { error } = await supabase.from('usuarios').insert([
        {
          nome: form.nome,
          email: form.email,
          ativo: form.ativo,
          role: form.role,
        },
      ])
      if (error) {
        alert('Erro ao criar usuário: ' + error.message)
        return
      }
    }
    setModalOpen(false)
    fetchUsuarios()
  }

  // deletar usuário
  const deleteUser = async (id: string) => {
    if (!confirm('Confirma excluir este usuário?')) return
    const { error } = await supabase.from('usuarios').delete().eq('id', id)
    if (error) {
      alert('Erro ao excluir usuário: ' + error.message)
      return
    }
    fetchUsuarios()
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Gerenciar Usuários</h1>

      <button
        onClick={openNewUserModal}
        className="mb-6 bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        + Novo Usuário
      </button>

      {loading ? (
        <p>Carregando usuários...</p>
      ) : (
        <table className="w-full text-left border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-2 border border-gray-700">Nome</th>
              <th className="p-2 border border-gray-700">Email</th>
              <th className="p-2 border border-gray-700">Ativo</th>
              <th className="p-2 border border-gray-700">Role</th>
              <th className="p-2 border border-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(user => (
              <tr key={user.id} className="border border-gray-700 hover:bg-gray-700">
                <td className="p-2">{user.nome}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">
                  <input type="checkbox" checked={user.ativo} readOnly />
                </td>
                <td className="p-2">{user.role}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => openEditUserModal(user)}
                    className="bg-yellow-600 hover:bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-700 hover:bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded w-[400px] max-w-full">
            <h2 className="text-2xl font-bold mb-4">
              {editingUser ? 'Editar Usuário' : 'Novo Usuário'}
            </h2>

            <form
              onSubmit={e => {
                e.preventDefault()
                saveUser()
              }}
              className="flex flex-col gap-4"
            >
              <label>
                Nome:
                <input
                  type="text"
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                  required
                />
              </label>

              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                  required
                />
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="ativo"
                  checked={form.ativo}
                  onChange={handleChange}
                />
                <span>Ativo</span>
              </label>

              <label>
                Role:
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </label>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-red-700 hover:bg-red-600 text-white py-2 px-4 rounded"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
