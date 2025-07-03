'use client'

import React, { useState, useEffect } from 'react'

const LANGUAGES = [
  { code: 'pt', label: 'Português' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
]

export default function LanguageSelector() {
  const [language, setLanguage] = useState('pt')

  useEffect(() => {
    const saved = localStorage.getItem('app-language')
    if (saved && LANGUAGES.some((l) => l.code === saved)) {
      setLanguage(saved)
    }
  }, [])

  const changeLanguage = (code: string) => {
    setLanguage(code)
    localStorage.setItem('app-language', code)
    // aqui você pode adicionar integração com i18n ou qualquer outra lib
  }

  return (
    <select
      value={language}
      onChange={(e) => changeLanguage(e.target.value)}
      className="bg-gray-800 text-white px-3 py-1 rounded"
      aria-label="Selecionar idioma"
    >
      {LANGUAGES.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  )
}
