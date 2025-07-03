'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    console.warn('Página não encontrada');
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-[#1a0000] text-white px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl font-medium mb-8">Página não encontrada</p>

      <Link
        href="/"
        className="px-6 py-3 bg-red-800 hover:bg-red-700 transition-colors rounded-xl text-white shadow-md"
      >
        Voltar à página inicial
      </Link>
    </div>
  );
}
