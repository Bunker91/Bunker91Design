'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('Erro capturado pelo error.tsx:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-[#1a0000] text-white px-4">
      <h1 className="text-4xl font-bold mb-4">Algo deu errado.</h1>
      <p className="text-lg mb-8">Ocorreu um erro inesperado ao carregar essa página.</p>

      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-5 py-3 bg-red-800 hover:bg-red-700 transition-colors rounded-xl text-white shadow-md"
        >
          Tentar novamente
        </button>

        <Link
          href="/"
          className="px-5 py-3 border border-red-800 text-red-500 hover:text-white hover:bg-red-800 transition-colors rounded-xl"
        >
          Voltar à Home
        </Link>
      </div>
    </div>
  );
}
