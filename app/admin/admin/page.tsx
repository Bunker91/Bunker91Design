'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://besntryyclwztpuhmxcy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlc250cnl5Y2x3enRwdWhteGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1MTExMDYsImV4cCI6MjA2NzA4NzEwNn0.ub8ijuk62Jw2XC7OZGmIu2dNeCCPVWWxnARgqB_49oM'
);

type Config = {
  id: string;
  tema: string; // ex: 'claro', 'escuro', 'vermelho'
  slogan: string;
  tituloPaginaInicial: string;
  metodoPagamento: string; // ex: 'MercadoPago', 'Stripe'
};

export default function AdminConfigPage() {
  const [config, setConfig] = useState<Config | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    tema: 'escuro',
    slogan: '',
    tituloPaginaInicial: '',
    metodoPagamento: 'MercadoPago',
  });

  const fetchConfig = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('configuracoes').select('*').limit(1).single();
    if (error) {
      alert('Erro ao carregar configurações: ' + error.message);
      setLoading(false);
      return;
    }
    setConfig(data);
    setForm({
      tema: data.tema,
      slogan: data.slogan,
      tituloPaginaInicial: data.tituloPaginaInicial,
      metodoPagamento: data.metodoPagamento,
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('configuracoes').upsert(
      {
        id: config?.id || 'singleton',
        tema: form.tema,
        slogan: form.slogan,
        tituloPaginaInicial: form.tituloPaginaInicial,
        metodoPagamento: form.metodoPagamento,
      },
      { onConflict: 'id' }
    );
    if (error) {
      alert('Erro ao salvar configurações: ' + error.message);
      return;
    }
    alert('Configurações atualizadas com sucesso!');
  };

  if (loading) return <p>Carregando configurações...</p>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Configurações do Site</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg">
        <label>
          Tema:
          <select
            name="tema"
            value={form.tema}
            onChange={handleChange}
            className="bg-gray-800 text-white p-2 rounded w-full"
          >
            <option value="claro">Claro</option>
            <option value="escuro">Escuro</option>
            <option value="vermelho">Vermelho</option>
          </select>
        </label>

        <label>
          Slogan:
          <input
            type="text"
            name="slogan"
            value={form.slogan}
            onChange={handleChange}
            className="bg-gray-800 text-white p-2 rounded w-full"
          />
        </label>

        <label>
          Título da Página Inicial:
          <input
            type="text"
            name="tituloPaginaInicial"
            value={form.tituloPaginaInicial}
            onChange={handleChange}
            className="bg-gray-800 text-white p-2 rounded w-full"
          />
        </label>

        <label>
          Método de Pagamento:
          <select
            name="metodoPagamento"
            value={form.metodoPagamento}
            onChange={handleChange}
            className="bg-gray-800 text-white p-2 rounded w-full"
          >
            <option value="MercadoPago">MercadoPago</option>
            <option value="Stripe">Stripe</option>
          </select>
        </label>

        <button
          type="submit"
          className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Salvar Configurações
        </button>
      </form>
    </div>
  );
}
