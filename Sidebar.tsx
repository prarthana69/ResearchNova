import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Search, Upload, MessageSquare,
  BookOpen, Microscope, TrendingUp, Network,
  Map, FolderOpen, Settings, Zap
} from 'lucide-react'

const nav = [
  { to: '/app/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/app/discover', icon: Search, label: 'Discover' },
  { to: '/app/upload', icon: Upload, label: 'Upload' },
  { to: '/app/chat', icon: MessageSquare, label: 'Research Chat' },
  { to: '/app/review', icon: BookOpen, label: 'Literature Review' },
  { to: '/app/gaps', icon: Microscope, label: 'Gap Explorer' },
  { to: '/app/trends', icon: TrendingUp, label: 'Trend Radar' },
  { to: '/app/graph', icon: Network, label: 'Knowledge Graph' },
  { to: '/app/roadmap', icon: Map, label: 'Roadmap' },
  { to: '/app/projects', icon: FolderOpen, label: 'Projects' },
  { to: '/app/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar() {
  return (
    <aside
      className="w-64 flex flex-col flex-shrink-0 border-r"
      style={{ background: '#080d1a', borderColor: '#1e2d45' }}
    >
      {/* Logo */}
      <div className="p-5 border-b" style={{ borderColor: '#1e2d45' }}>
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
          >
            <Zap size={16} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-sm" style={{ color: '#f1f5f9' }}>ResearchNova</div>
            <div className="text-xs" style={{ color: '#6366f1' }}>AI Co-Pilot</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {nav.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm transition-all ${
                isActive
                  ? 'font-medium'
                  : 'hover:bg-white/5'
              }`
            }
            style={({ isActive }) => ({
              background: isActive ? 'rgba(99,102,241,0.15)' : undefined,
              color: isActive ? '#818cf8' : '#94a3b8',
              borderLeft: isActive ? '2px solid #6366f1' : '2px solid transparent',
            })}
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t text-xs" style={{ borderColor: '#1e2d45', color: '#4b5563' }}>
        ResearchNova AI v1.0
      </div>
    </aside>
  )
}
