// /components/LogItem.tsx

interface LogItemProps {
  message: string
  user?: string
  date: string
}

export default function LogItem({ message, user, date }: LogItemProps) {
  return (
    <div className="bg-gray-900 border-l-4 border-red-600 p-4 mb-2 text-white">
      <p>{message}</p>
      {user && <p className="text-sm text-gray-400">Usuário: {user}</p>}
      <p className="text-sm text-gray-500">{new Date(date).toLocaleString()}</p>
    </div>
  )
}
