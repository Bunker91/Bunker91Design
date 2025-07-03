'use client'

import React from 'react'
import Link from 'next/link'
import LogoutButton from './LogoutButton'

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-[#330000] p-4 text-white shadow">
      <Link href="/" className="text-xl font-bold">
        Bunker91
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/kit" className="hover:underline">Kits</Link>
        <Link href="/login" className="hover:underline">Entrar</Link>
        <LogoutButton />
      </div>
    </header>
  )
}

export default Header
