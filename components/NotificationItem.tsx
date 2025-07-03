// /components/NotificationItem.tsx

interface NotificationItemProps {
  title: string
  message: string
  date: string
}

export default function NotificationItem({ title, message, date }: NotificationItemProps) {
  return (
    <div className="bg-gray-800 p-4 rounded mb-4 border border-gray-700 text-white">
      <h3 className="font-bold text-lg">{title}</h3>
      <p>{message}</p>
      <small className="text-gray-400">{new Date(date).toLocaleString()}</small>
    </div>
  )
}
