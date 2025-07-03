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
  const [loa]()
