"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import { supabase } from "../lib/supabase";

const niches = [
  "Restaurantes",
  "Cafeterias",
  "Lojas de Roupas",
  "Academias",
  "Salões de Beleza",
  "Pet Shops",
  "Lojas de Informática",
  "Confeitarias",
  "Padarias",
  "Barbearias",
  "Floriculturas",
  "Consultórios Médicos",
  "Escolas",
  "Loja de Móveis",
  "Supermercados",
  "Estúdios Fotográficos",
  "Lojas de Calçados",
  "Oficinas Mecânicas",
  "Lojas de Decoração",
  "Farmácias",
  "Bares",
  "Lojas de Cosméticos",
  "Hotéis",
  "Lojas de Eletrônicos",
  "Empresas de Tecnologia",
  "Escritórios de Advocacia",
  "Imobiliárias",
  "Consultorias",
  "Lojas de Brinquedos",
  "Academias de Dança",
  "Clinicas Odontológicas",
  "Lojas de Artigos Esportivos",
  "Empresas de Limpeza",
  "Restaurantes Veganos",
  "Cafeterias Gourmet",
  "Lojas de Produtos Naturais",
  "Lojas de Bicicletas",
  "Escolas de Música",
  "Empresas de Marketing",
  "Salas de Jogos",
  "Lojas de Instrumentos Musicais",
  "Bares Temáticos",
  "Loja de Presentes",
  "Lojas de Relojoaria",
  "Estúdios de Tattoo",
  "Escolas de Idiomas",
  "Lojas de Vinhos",
  "Lojas de Artesanato",
  "Lojas de Decoração Infantil",
  "Consultorias Financeiras",
];

type Kit = {
  id: string;
  name: string;
  price: number;
  niche: string;
  thumbnail: string;
  language: string;
};

const mockKits: Kit[] = Array.from({ length: 49 }, (_, i) => ({
  id: `kit-${i + 1}`,
  name: `Kit Profissional ${i + 1}`,
  price: 24.9,
  niche: niches[i],
  thumbnail: "/images/kit-thumbnail.png",
  language: "pt",
}));

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("pt");
  const [order, setOrder] = useState("recent");
  const [filteredKits, setFilteredKits] = useState<Kit[]>(mockKits);

  useEffect(() => {
    let filtered = mockKits;

    if (search) {
      filtered = filtered.filter((kit) =>
        kit.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedNiche) {
      filtered = filtered.filter((kit) => kit.niche === selectedNiche);
    }

    if (selectedLanguage) {
      filtered = filtered.filter((kit) => kit.language === selectedLanguage);
    }

    // ordenação básica (recente, popular e aleatório - mock)
    if (order === "recent") {
      filtered = filtered.slice().reverse();
    } else if (order === "popular") {
      // mock popular - ordena por id crescente
      filtered = filtered.slice().sort((a, b) => (a.id > b.id ? 1 : -1));
    } else if (order === "random") {
      filtered = filtered.slice().sort(() => Math.random() - 0.5);
    }

    setFilteredKits(filtered);
  }, [search, selectedNiche, selectedLanguage, order]);

  return (
    <>
      <Header />
      <main className="bg-gradient-to-b from-black via-bunker-red to-black min-h-screen p-6">
        <section className="max-w-7xl mx-auto text-white">
          <h1 className="text-4xl font-bold mb-2 text-center">
            Bunker 91 — Designs para seu estabelecimento
          </h1>
          <p className="text-center mb-6 text-lg">
            Escolha um kit profissional e aumente suas vendas com designs de
            impacto.
          </p>

          {/* Pesquisa e filtros */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-10">
            <input
              type="text"
              placeholder="Pesquisar kits..."
              className="px-4 py-2 rounded-md bg-black bg-opacity-50 border border-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 flex-grow text-white placeholder-red-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="px-4 py-2 rounded-md bg-black bg-opacity-50 border border-red-700 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              value={selectedNiche}
              onChange={(e) => setSelectedNiche(e.target.value)}
            >
              <option value="">Todos os nichos</option>
              {niches.map((niche) => (
                <option key={niche} value={niche}>
                  {niche}
                </option>
              ))}
            </select>

            <select
              className="px-4 py-2 rounded-md bg-black bg-opacity-50 border border-red-700 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value="pt">Português</option>
              <option value="en">Inglês</option>
              <option value="fr">Francês</option>
            </select>

            <select
              className="px-4 py-2 rounded-md bg-black bg-opacity-50 border border-red-700 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            >
              <option value="recent">Mais recentes</option>
              <option value="popular">Populares</option>
              <option value="random">Aleatório</option>
            </select>
          </div>

          {/* Grid dos kits */}
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredKits.length === 0 ? (
              <p className="text-center col-span-full text-red-600 font-semibold">
                Nenhum kit encontrado.
              </p>
            ) : (
              filteredKits.map((kit) => (
                <a
                  key={kit.id}
                  href={`/kit/${kit.id}`}
                  className="bg-black bg-opacity-50 rounded-lg shadow-lg p-4 flex flex-col items-center transition hover:shadow-red-700"
                >
                  <img
                    src={kit.thumbnail}
                    alt={`Thumbnail do ${kit.name}`}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h2 className="mt-4 font-semibold text-lg text-center">
                    {kit.name}
                  </h2>
                  <p className="mt-2 text-red-500 font-bold">
                    R$ {kit.price.toFixed(2)}
                  </p>
                </a>
              ))
            )}
          </section>
        </section>
      </main>
    </>
  );
}
