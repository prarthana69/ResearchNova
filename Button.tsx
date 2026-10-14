import type { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  loading?: boolean
}

const variants = {
  primary: { background: '#6366f1', color: 'white', border: 'none' },
  secondary: { background: '#1e2d45', color: '#e2e8f0', border: '1px solid #2d3748' },
  ghost: { background: 'transparent', color: '#94a3b8', border: 'none' },
  danger: { background: '#7f1d1d', color: '#fca5a5', border: '1px solid #991b1b' },
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  loading,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${sizes[size]} ${className}`}
      style={variants[variant]}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" />
        </svg>
      )}
      {children}
    </button>
  )
}
