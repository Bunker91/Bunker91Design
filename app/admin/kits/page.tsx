'use client';

import { useEffect, useState, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const supabase = createClient(
  'https://besntryyclwztpuhmxcy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlc250cnl5Y2x3enRwdWhteGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1MTExMDYsImV4cCI6MjA2NzA4NzEwNn0.ub8ijuk62Jw2XC7OZGmIu2dNeCCPVWWxnARgqB_49oM'
);

type Kit = {
  id: number;
  name: string;
  short_desc: string;
  long_desc: string;
  niche: string;
  price: number;
  images: string[]; // urls
};

const niches = [
  /* coloque aqui suas 49 opções exatas de nicho, ex: */
  'Restaurante',
  'Moda',
  'Beleza',
  'Educação',
  'Fitness',
  // ...complete com os seus 49 nichos exatos
];

export default function AdminKitsPage() {
  const [kits, setKits] = useState<Kit[]>([]);
  const [loading, setLoading] = useState(true);

  const [formMode, setFormMode] = useState<'create' | 'edit' | null>(null);
  const [formData, setFormData] = useState<Partial<Kit>>({});
  const [imagesToUpload, setImagesToUpload] = useState<File[]>([]);

  // busca kits
  const fetchKits = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('kits').select('*').order('id', { ascending: true });
    if (error) {
      alert('Erro ao buscar kits: ' + error.message);
      setLoading(false);
      return;
    }
    setKits(data as Kit[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchKits();
  }, []);

  // upload múltiplo de imagens para supabase storage
  const uploadImages = async (files: File[], kitId: number) => {
    if (files.length === 0) return [];

    const urls: string[] = [];
    for (const file of files) {
      const fileName = `${kitId}/${Date.now()}_${file.name}`;
      const { error } = await supabase.storage
        .from('kits-images')
        .upload(fileName, file, { cacheControl: '3600', upsert: false });

      if (error) {
        alert('Erro ao enviar imagem: ' + error.message);
        continue;
      }
      const { data } = supabase.storage.from('kits-images').getPublicUrl(fileName);
      urls.push(data.publicUrl);
    }
    return urls;
  };

  // submit criar ou editar kit
  const handleSubmit = async () => {
    if (!formData.name || !formData.niche || !formData.price) {
      alert('Preencha nome, nicho e preço');
      return;
    }

    if (formMode === 'create') {
      // criar
      const { data, error } = await supabase.from('kits').insert([
        {
          name: formData.name,
          short_desc: formData.short_desc || '',
          long_desc: formData.long_desc || '',
          niche: formData.niche,
          price: formData.price,
          images: [],
        },
      ]);
      if (error) {
        alert('Erro ao criar kit: ' + error.message);
        return;
      }
      const newKit = data![0];

      // upload imagens se houver
      if (imagesToUpload.length > 0) {
        const urls = await uploadImages(imagesToUpload, newKit.id);
        await supabase.from('kits').update({ images: urls }).eq('id', newKit.id);
      }

      alert('Kit criado com sucesso!');
      setFormMode(null);
      setFormData({});
      setImagesToUpload([]);
      fetchKits();
    } else if (formMode === 'edit' && formData.id) {
      // editar
      let urls = formData.images || [];
      if (imagesToUpload.length > 0) {
        const newUrls = await uploadImages(imagesToUpload, formData.id);
        urls = [...urls, ...newUrls];
      }
      const { error } = await supabase
        .from('kits')
        .update({
          name: formData.name,
          short_desc: formData.short_desc || '',
          long_desc: formData.long_desc || '',
          niche: formData.niche,
          price: formData.price,
          images: urls,
        })
        .eq('id', formData.id);
      if (error) {
        alert('Erro ao atualizar kit: ' + error.message);
        return;
      }
      alert('Kit atualizado com sucesso!');
      setFormMode(null);
      setFormData({});
      setImagesToUpload([]);
      fetchKits();
    }
  };

  // excluir kit
  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este kit?')) return;

    const { error } = await supabase.from('kits').delete().eq('id', id);
    if (error) {
      alert('Erro ao excluir kit: ' + error.message);
      return;
    }
    alert('Kit excluído!');
    fetchKits();
  };

  // remover imagem da lista do kit
  const removeImage = (url: string) => {
    if (!formData.images) return;
    setFormData({
      ...formData,
      images: formData.images.filter((img) => img !== url),
    });
  };

  // drag & drop simples para upload de imagens
  const dragRef = useRef<HTMLDivElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setImagesToUpload((old) => [...old, ...Array.from(e.dataTransfer.files)]);
      e.dataTransfer.clearData();
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Gerenciar Kits</h2>

      {/* Botões criar e cancelar */}
      {!formMode && (
        <button
          onClick={() => {
            setFormMode('create');
            setFormData({});
            setImagesToUpload([]);
          }}
          className="mb-6 bg-red-900 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          + Criar Novo Kit
        </button>
      )}

      {/* Formulário criar/editar */}
      {(formMode === 'create' || formMode === 'edit') && (
        <div className="mb-8 p-6 bg-gray-900 rounded-md max-w-3xl">
          <label className="block mb-2 font-semibold">Nome do Kit *</label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-700 text-white"
            placeholder="Nome do kit"
          />

          <label className="block mb-2 font-semibold">Descrição Curta</label>
          <input
            type="text"
            value={formData.short_desc || ''}
            onChange={(e) => setFormData({ ...formData, short_desc: e.target.value })}
            className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-700 text-white"
            placeholder="Descrição breve para listagem"
          />

          <label className="block mb-2 font-semibold">Descrição Longa (Markdown)</label>
          <textarea
            rows={6}
            value={formData.long_desc || ''}
            onChange={(e) => setFormData({ ...formData, long_desc: e.target.value })}
            className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-700 text-white font-mono"
            placeholder="Descrição detalhada do kit em Markdown"
          />

          <label className="block mb-2 font-semibold">Nicho *</label>
          <select
            value={formData.niche || ''}
            onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
            className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-700 text-white"
          >
            <option value="">Selecione um nicho</option>
            {niches.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>

          <label className="block mb-2 font-semibold">Preço (R$) *</label>
          <input
            type="number"
            value={formData.price ?? ''}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-700 text-white"
            placeholder="Ex: 24.90"
            min={0}
            step="0.01"
          />

          {/* Upload drag & drop imagens */}
          <div
            ref={dragRef}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className={`mb-4 p-6 border-2 border-dashed rounded cursor-pointer ${
              dragActive ? 'border-red-600 bg-red-900/30' : 'border-gray-700'
            }`}
          >
            Arraste e solte imagens aqui ou clique para selecionar
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) setImagesToUpload((old) => [...old, ...Array.from(e.target.files)]);
              }}
              className="hidden"
              id="file-upload"
            />
          </div>

          {/* Preview imagens para upload */}
          {imagesToUpload.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {imagesToUpload.map((file, i) => (
                <div key={i} className="relative w-20 h-20 border rounded overflow-hidden">
                  <img src={URL.createObjectURL(file)} alt="upload preview" className="object-cover w-full h-full" />
                  <button
                    onClick={() =>
                      setImagesToUpload((old) => old.filter((_, index) => index !== i))
                    }
                    className="absolute top-0 right-0 bg-red-700 rounded px-1 text-xs"
                    title="Remover"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Imagens já salvas no kit (quando em edição) */}
          {formMode === 'edit' && formData.images && formData.images.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {formData.images.map((url, i) => (
                <div key={i} className="relative w-20 h-20 border rounded overflow-hidden">
                  <img src={url} alt={`imagem kit ${i + 1}`} className="object-cover w-full h-full" />
                  <button
                    onClick={() => removeImage(url)}
                    className="absolute top-0 right-0 bg-red-700 rounded px-1 text-xs"
                    title="Remover"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Botões */}
          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="bg-red-900 hover:bg-red-700 px-4 py-2 rounded text-white"
            >
              {formMode === 'create' ? 'Criar Kit' : 'Salvar Alterações'}
            </button>
            <button
              onClick={() => {
                setFormMode(null);
                setFormData({});
                setImagesToUpload([]);
              }}
              className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded text-white"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Lista de kits */}
      <div className="overflow-auto max-h-[500px] border border-gray-700 rounded p-4">
        {loading && <p>Carregando kits...</p>}
        {!loading && kits.length === 0 && <p>Nenhum kit cadastrado ainda.</p>}
        {!loading &&
          kits.map((kit) => (
            <div
              key={kit.id}
              className="flex justify-between items-center border-b border-gray-700 py-2"
            >
              <div>
                <strong>{kit.name}</strong> - {kit.niche} - R${kit.price.toFixed(2)}
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-yellow-700 hover:bg-yellow-600 px-3 py-1 rounded text-black"
                  onClick={() => {
                    setFormMode('edit');
                    setFormData(kit);
                    setImagesToUpload([]);
                  }}
                >
                  Editar
                </button>
                <button
                  className="bg-red-800 hover:bg-red-700 px-3 py-1 rounded"
                  onClick={() => handleDelete(kit.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
