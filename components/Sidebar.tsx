'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  items: { label: string; href: string }[]
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-6">
      <nav className="flex flex-col space-y-4">
        {items.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className={`block px-4 py-2 rounded hover:bg-gray-800 ${
              pathname === href ? 'bg-gray-800 font-bold' : ''
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
