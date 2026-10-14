import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: ReactNode
}

export default function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: 'rgba(99,102,241,0.1)' }}
      >
        <Icon size={28} style={{ color: '#6366f1' }} />
      </div>
      <h3 className="font-semibold text-lg mb-2" style={{ color: '#f1f5f9' }}>{title}</h3>
      <p className="text-sm mb-6 max-w-sm" style={{ color: '#94a3b8' }}>{description}</p>
      {action}
    </div>
  )
}
