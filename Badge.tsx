interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'violet'
}

const colors = {
  default: { background: 'rgba(99,102,241,0.15)', color: '#818cf8' },
  success: { background: 'rgba(16,185,129,0.15)', color: '#34d399' },
  warning: { background: 'rgba(245,158,11,0.15)', color: '#fbbf24' },
  danger: { background: 'rgba(239,68,68,0.15)', color: '#f87171' },
  info: { background: 'rgba(34,211,238,0.15)', color: '#22d3ee' },
  violet: { background: 'rgba(139,92,246,0.15)', color: '#a78bfa' },
}

export default function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
      style={colors[variant]}
    >
      {children}
    </span>
  )
}
