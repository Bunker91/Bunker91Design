'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://besntryyclwztpuhmxcy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlc250cnl5Y2x3enRwdWhteGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1MTExMDYsImV4cCI6MjA2NzA4NzEwNn0.ub8ijuk62Jw2XC7OZGmIu2dNeCCPVWWxnARgqB_49oM'
);

type User = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: string | null;
  created_at: string | null;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<User>>({});

  const fetchUsers = async () => {
    setLoading(true);
    // supabase.auth.api.listUsers() is deprecated, so we get users from table "users"
    // or if you store users in a table, adapt query here accordingly
    const { data, error } = await supabase.from('users').select('*').order('created_at', { ascending: true });
    if (error) {
      alert('Erro ao buscar usuários: ' + error.message);
      setLoading(false);
      return;
    }
    setUsers(data as User[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const startEdit = (user: User) => {
    setEditUserId(user.id);
    setEditData(user);
  };

  const cancelEdit = () => {
    setEditUserId(null);
    setEditData({});
  };

  const saveEdit = async () => {
    if (!editUserId) return;

    const { error } = await supabase.from('users').update({
      full_name: editData.full_name,
      role: editData.role,
    }).eq('id', editUserId);

    if (error) {
      alert('Erro ao salvar usuário: ' + error.message);
      return;
    }
    alert('Usuário atualizado com sucesso!');
    cancelEdit();
    fetchUsers();
  };

  const deleteUser = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) return;

    const { error } = await supabase.from('users').delete().eq('id', id);
    if (error) {
      alert('Erro ao excluir usuário: ' + error.message);
      return;
    }
    alert('Usuário excluído!');
    fetchUsers();
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Gerenciar Usuários</h2>

      {loading && <p>Carregando usuários...</p>}

      {!loading && users.length === 0 && <p>Nenhum usuário encontrado.</p>}

      {!loading &&
        users.map((user) => (
          <div key={user.id} className="border border-gray-700 rounded mb-4 p-4 bg-gray-900 flex flex-col md:flex-row md:items-center md:justify-between">
            {editUserId === user.id ? (
              <>
                <div className="flex flex-col gap-2 w-full md:w-auto">
                  <input
                    type="text"
                    placeholder="Nome Completo"
                    value={editData.full_name || ''}
                    onChange={(e) => setEditData({ ...editData, full_name: e.target.value })}
                    className="p-2 rounded bg-gray-800 border border-gray-700 text-white"
                  />
                  <input
                    type="text"
                    placeholder="Função / Papel"
                    value={editData.role || ''}
                    onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                    className="p-2 rounded bg-gray-800 border border-gray-700 text-white"
                  />
                </div>
                <div className="mt-2 md:mt-0 flex gap-2">
                  <button
                    onClick={saveEdit}
                    className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded text-black"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded text-white"
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <strong>{user.full_name || '(sem nome)'}</strong> - <em>{user.email || '(sem email)'}</em> - <small>{user.role || '(sem função)'}</small>
                </div>
                <div className="mt-2 md:mt-0 flex gap-2">
                  <button
                    onClick={() => startEdit(user)}
                    className="bg-yellow-700 hover:bg-yellow-600 px-3 py-1 rounded text-black"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-800 hover:bg-red-700 px-3 py-1 rounded"
                  >
                    Excluir
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
    </div>
  );
}
