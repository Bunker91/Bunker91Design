// /components/NotificationBadge.tsx

interface NotificationBadgeProps {
  count: number
}

export default function NotificationBadge({ count }: NotificationBadgeProps) {
  if (count <= 0) return null

  return (
    <span className="bg-red-600 text-white rounded-full px-2 py-1 text-xs ml-2">
      {count}
    </span>
  )
}
