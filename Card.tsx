import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}

export function Card({ children, className = '', style }: CardProps) {
  return (
    <div
      className={`rounded-xl border p-5 ${className}`}
      style={{ background: '#111827', borderColor: '#1e2d45', ...style }}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mb-4 ${className}`}>{children}</div>
}

export function CardTitle({ children }: { children: ReactNode }) {
  return <h3 className="font-semibold text-base" style={{ color: '#f1f5f9' }}>{children}</h3>
}
