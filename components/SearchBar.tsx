'use client'

import React, { useState, ChangeEvent } from 'react'

interface SearchBarProps {
  placeholder?: string
  onSearch: (query: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Buscar...', onSearch }) => {
  const [query, setQuery] = useState('')

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value)
    onSearch(e.target.value)
  }

  return (
    <input
      type="text"
      value={query}
      onChange={handleChange}
      placeholder={placeholder}
      className="w-full max-w-md p-2 rounded border border-gray-600 bg-gray-900 text-white"
      aria-label="Buscar"
    />
  )
}

export default SearchBar
