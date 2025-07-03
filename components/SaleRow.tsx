// /components/SaleRow.tsx

import React from 'react'

interface SaleRowProps {
  id: string
  userEmail: string
  kitId: string
  price: number
  currency: string
  status: string
  date: string
}

export default function SaleRow({
  id, userEmail, kitId, price, currency, status, date
}: SaleRowProps) {
  return (
    <tr className="even:bg-gray-800 odd:bg-gray-700">
      <td className="border border-gray-600 px-4 py-2">{id}</td>
      <td className="border border-gray-600 px-4 py-2">{userEmail}</td>
      <td className="border border-gray-600 px-4 py-2">{kitId}</td>
      <td className="border border-gray-600 px-4 py-2">{price.toFixed(2)} {currency}</td>
      <td className="border border-gray-600 px-4 py-2">{status}</td>
      <td className="border border-gray-600 px-4 py-2">{new Date(date).toLocaleString()}</td>
    </tr>
  )
}
