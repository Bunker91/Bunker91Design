'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://besntryyclwztpuhmxcy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlc250cnl5Y2x3enRwdWhteGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1MTExMDYsImV4cCI6MjA2NzA4NzEwNn0.ub8ijuk62Jw2XC7OZGmIu2dNeCCPVWWxnARgqB_49oM'
);

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [kits, setKits] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [sales, setSales] = useState<any[]>([]);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (!data.session || data.session.user.email !== 'bunker91design@gmail.com') {
        router.push('/');
      } else {
        setSession(data.session);
        await fetchDashboardData();
      }

      setLoading(false);
    };

    getSession();
  }, []);

  const fetchDashboardData = async () => {
    const { data: kitsData } = await supabase.from('kits').select('*');
    const { data: usersData } = await supabase.from('users').select('*');
    const { data: salesData } = await supabase.from('sales').select('*');

    setKits(kitsData || []);
    setUsers(usersData || []);
    setSales(salesData || []);
  };

  if (loading) return <div className="text-white p-10">Carregando painel...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-6">Painel Administrativo</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[#1a0000] p-6 rounded-xl shadow-xl">
          <h2 className="text-xl font-semibold mb-2">Kits Cadastrados</h2>
          <p className="text-3xl">{kits.length}</p>
        </div>

        <div className="bg-[#1a0000] p-6 rounded-xl shadow-xl">
          <h2 className="text-xl font-semibold mb-2">Usuários</h2>
          <p className="text-3xl">{users.length}</p>
        </div>

        <div className="bg-[#1a0000] p-6 rounded-xl shadow-xl">
          <h2 className="text-xl font-semibold mb-2">Vendas</h2>
          <p className="text-3xl">{sales.length}</p>
        </div>
      </div>
    </div>
  );
}
