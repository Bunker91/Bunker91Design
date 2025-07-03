'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://besntryyclwztpuhmxcy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlc250cnl5Y2x3enRwdWhteGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1MTExMDYsImV4cCI6MjA2NzA4NzEwNn0.ub8ijuk62Jw2XC7OZGmIu2dNeCCPVWWxnARgqB_49oM'
);

type Venda = {
  id: string;
  user_id: string;
  kit_id: string;
  status: string; // ex: "pendente", "pago", "cancelado"
  valor: number;
  moeda: string;
  criado_em: string | null;
};

export default function AdminVendasPage() {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVendas = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('vendas').select('*').order('criado_em', { ascending: false });
    if (error) {
      alert('Erro ao carregar vendas: ' + error.message);
      setLoading(false);
      return;
    }
    setVendas(data as Venda[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchVendas();
  }, []);

  const atualizarStatus = async (id: string, novoStatus: string) => {
    const { error } = await supabase.from('vendas').update({ status: novoStatus }).eq('id', id);
    if (error) {
      alert('Erro ao atualizar status: ' + error.message);
      return;
    }
    alert('Status atualizado com sucesso!');
    fetchVendas();
  };

  const excluirVenda = async (id: string) => {
    if (!confirm('Deseja excluir esta venda?')) return;
    const { error } = await supabase.from('vendas').delete().eq('id', id);
    if (error) {
      alert('Erro ao excluir venda: ' + error.message);
      return;
    }
    alert('Venda excluída!');
    fetchVendas();
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Gerenciar Vendas</h2>

      {loading && <p>Carregando vendas...</p>}

      {!loading && vendas.length === 0 && <p>Nenhuma venda registrada.</p>}

      {!loading &&
        vendas.map((venda) => (
          <div key={venda.id} className="border border-gray-700 rounded mb-4 p-4 bg-gray-900 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <strong>ID:</strong> {venda.id} <br />
              <strong>User ID:</strong> {venda.user_id} <br />
              <strong>Kit ID:</strong> {venda.kit_id} <br />
              <strong>Valor:</strong> {venda.valor.toFixed(2)} {venda.moeda} <br />
              <strong>Data:</strong> {new Date(venda.criado_em || '').toLocaleString()} <br />
              <strong>Status:</strong> {venda.status}
            </div>
            <div className="flex gap-2">
              <select
                value={venda.status}
                onChange={(e) => atualizarStatus(venda.id, e.target.value)}
                className="bg-gray-800 text-white px-3 py-1 rounded"
              >
                <option value="pendente">Pendente</option>
                <option value="pago">Pago</option>
                <option value="cancelado">Cancelado</option>
              </select>
              <button
                onClick={() => excluirVenda(venda.id)}
                className="bg-red-700 hover:bg-red-600 px-3 py-1 rounded"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
