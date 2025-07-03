'use client';

import { useEffect, useState, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import SortableItem from './SortableItem'; // componente que vamos criar pra cada item sortable

const supabase = createClient(
  'https://besntryyclwztpuhmxcy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC7I6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlc250cnl5Y2x3enRwdWhteGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1MTExMDYsImV4cCI6MjA2NzA4NzEwNn0.ub8ijuk62Jw2XC7OZGmIu2dNeCCPVWWxnARgqB_49oM'
);

// tipos do kit
type Kit = {
  id: string;
  nome: string;
  descricaoCurta: string;
  descricaoLonga: string;
  imagens: string[]; // urls das imagens
  nicho: string;
  idiomas: string[]; // ex: ['pt', 'en', 'fr']
  preco: { [moeda: string]: number }; // ex: { BRL: 24.9, USD: 4.9 }
  ordem: number;
};

const NICHOS = [
  "Alimentação", "Moda", "Tecnologia", "Saúde", "Educação", "Beleza",
  "Esportes", "Automotivo", "Imobiliário", "Entretenimento", "Viagens",
  // ... completa com os 49 nichos que você me enviar
];

const MOEDAS = ['BRL', 'USD', 'EUR'];

export default function AdminKitsPage() {
  const [kits, setKits] = useState<Kit[]>([]);
  const [loading, setLoading] = useState(true);

  // estados do modal/formulário
  const [modalOpen, setModalOpen] = useState(false);
  const [editingKit, setEditingKit] = useState<Kit | null>(null);
  const [form, setForm] = useState<Omit<Kit, 'id' | 'ordem'>>({
    nome: '',
    descricaoCurta: '',
    descricaoLonga: '',
    imagens: [],
    nicho: NICHOS[0],
    idiomas: ['pt'],
    preco: { BRL: 0 },
  });

  // busca kits da supabase
  const fetchKits = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('kits').select('*').order('ordem', { ascending: true });
    if (error) {
      alert('Erro ao buscar kits: ' + error.message);
      setLoading(false);
      return;
    }
    setKits(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchKits();
  }, []);

  // abre modal novo kit
  const openNewKitModal = () => {
    setEditingKit(null);
    setForm({
      nome: '',
      descricaoCurta: '',
      descricaoLonga: '',
      imagens: [],
      nicho: NICHOS[0],
      idiomas: ['pt'],
      preco: { BRL: 0 },
    });
    setModalOpen(true);
  };

  // abre modal para editar kit
  const openEditKitModal = (kit: Kit) => {
    setEditingKit(kit);
    setForm({
      nome: kit.nome,
      descricaoCurta: kit.descricaoCurta,
      descricaoLonga: kit.descricaoLonga,
      imagens: kit.imagens,
      nicho: kit.nicho,
      idiomas: kit.idiomas,
      preco: kit.preco,
    });
    setModalOpen(true);
  };

  // handle change simples do form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('preco_')) {
      const moeda = name.split('_')[1];
      setForm(prev => ({ ...prev, preco: { ...prev.preco, [moeda]: Number(value) } }));
    } else if (name === 'idiomas') {
      // checkbox idiomas
      const checked = (e.target as HTMLInputElement).checked;
      let novosIdiomas = [...form.idiomas];
      if (checked) {
        if (!novosIdiomas.includes(value)) novosIdiomas.push(value);
      } else {
        novosIdiomas = novosIdiomas.filter(i => i !== value);
      }
      setForm(prev => ({ ...prev, idiomas: novosIdiomas }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  // upload imagens (exemplo simples com supabase storage)
  const handleImageUpload = async (files: FileList | null) => {
    if (!files) return;
    const uploadedUrls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileName = `${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage.from('kits-images').upload(fileName, file);
      if (error) {
        alert('Erro no upload da imagem: ' + error.message);
        return;
      }
      const publicUrl = supabase.storage.from('kits-images').getPublicUrl(fileName).publicURL;
      uploadedUrls.push(publicUrl);
    }
    setForm(prev => ({ ...prev, imagens: [...prev.imagens, ...uploadedUrls] }));
  };

  // salvar kit (create ou update)
  const saveKit = async () => {
    if (!form.nome.trim()) {
      alert('Nome do kit obrigatório');
      return;
    }
    if (editingKit) {
      // update
      const { error } = await supabase.from('kits').update({
        nome: form.nome,
        descricaoCurta: form.descricaoCurta,
        descricaoLonga: form.descricaoLonga,
        imagens: form.imagens,
        nicho: form.nicho,
        idiomas: form.idiomas,
        preco: form.preco,
      }).eq('id', editingKit.id);
      if (error) {
        alert('Erro ao atualizar kit: ' + error.message);
        return;
      }
    } else {
      // create - ordem = maior ordem +1
      const maiorOrdem = kits.reduce((max, k) => k.ordem > max ? k.ordem : max, 0);
      const { error } = await supabase.from('kits').insert([{
        nome: form.nome,
        descricaoCurta: form.descricaoCurta,
        descricaoLonga: form.descricaoLonga,
        imagens: form.imagens,
        nicho: form.nicho,
        idiomas: form.idiomas,
        preco: form.preco,
        ordem: maiorOrdem + 1,
      }]);
      if (error) {
        alert('Erro ao criar kit: ' + error.message);
        return;
      }
    }
    setModalOpen(false);
    fetchKits();
  };

  // deletar kit
  const deleteKit = async (id: string) => {
    if (!confirm('Confirma excluir este kit?')) return;
    const { error } = await supabase.from('kits').delete().eq('id', id);
    if (error) {
      alert('Erro ao excluir kit: ' + error.message);
      return;
    }
    fetchKits();
  };

  // drag & drop handlers
  const sensors = useSensors(useSensor(PointerSensor));
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = kits.findIndex(k => k.id === active.id);
      const newIndex = kits.findIndex(k => k.id === over?.id);
      const newOrder = arrayMove(kits, oldIndex, newIndex);
      setKits(newOrder);
      // atualiza ordem no banco
      for (let i = 0; i < newOrder.length; i++) {
        await supabase.from('kits').update({ ordem: i }).eq('id', newOrder[i].id);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Gerenciar Kits</h1>

      <button
        onClick={openNewKitModal}
        className="mb-6 bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        + Novo Kit
      </button>

      {loading ? (
        <p>Carregando kits...</p>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext items={kits.map(k => k.id)} strategy={verticalListSortingStrategy}>
            <ul>
              {kits.map(kit => (
                <SortableItem
                  key={kit.id}
                  id={kit.id}
                  kit={kit}
                  onEdit={() => openEditKitModal(kit)}
                  onDelete={() => deleteKit(kit.id)}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      )}

      {/* modal do form */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded w-[600px] max-w-full max-h-[90vh] overflow-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editingKit ? 'Editar Kit' : 'Novo Kit'}
            </h2>

            <form
              onSubmit={e => {
                e.preventDefault();
                saveKit();
              }}
              className="flex flex-col gap-4"
            >
              <label>
                Nome:
                <input
                  name="nome"
                  type="text"
                  value={form.nome}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                  required
                />
              </label>

              <label>
                Descrição Curta:
                <input
                  name="descricaoCurta"
                  type="text"
                  value={form.descricaoCurta}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                />
              </label>

              <label>
                Descrição Longa:
                <textarea
                  name="descricaoLonga"
                  value={form.descricaoLonga}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                  rows={4}
                />
              </label>

              <label>
                Nicho:
                <select
                  name="nicho"
                  value={form.nicho}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                >
                  {NICHOS.map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </label>

              <fieldset>
                <legend>Idiomas Disponíveis:</legend>
                {['pt', 'en', 'fr'].map(lang => (
                  <label key={lang} className="mr-4">
                    <input
                      type="checkbox"
                      name="idiomas"
                      value={lang}
                      checked={form.idiomas.includes(lang)}
                      onChange={handleChange}
                    />{' '}
                    {lang.toUpperCase()}
                  </label>
                ))}
              </fieldset>

              <fieldset>
                <legend>Preço por moeda:</legend>
                {MOEDAS.map(moeda => (
                  <label key={moeda} className="block">
                    {moeda}:
                    <input
                      type="number"
                      name={`preco_${moeda}`}
                      value={form.preco[moeda] || ''}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                      className="ml-2 w-24 rounded bg-gray-800 text-white p-1"
                    />
                  </label>
                ))}
              </fieldset>

              <label>
                Upload Imagens:
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={e => handleImageUpload(e.target.files)}
                  className="w-full"
                />
              </label>

              <div className="flex flex-wrap gap-2 mb-4">
                {form.imagens.map((url, i) => (
                  <div key={i} className="relative w-20 h-20 rounded overflow-hidden border border-gray-700">
                    <img src={url} alt={`Imagem ${i + 1}`} className="object-cover w-full h-full" />
                    <button
                      type="button"
                      onClick={() => {
                        setForm(prev => ({
                          ...prev,
                          imagens: prev.imagens.filter((_, idx) => idx !== i),
                        }));
                      }}
                      className="absolute top-0 right-0 bg-red-600 text-white rounded px-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-2">
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
  );
}
