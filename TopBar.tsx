import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, ChevronDown, FolderOpen } from 'lucide-react'
import { projectsApi } from '../../lib/api'
import type { Project } from '../../lib/api'
import { useProjectStore } from '../../store/projectStore'
import toast from 'react-hot-toast'

export default function TopBar() {
  const [projects, setProjects] = useState<Project[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const { currentProject, setCurrentProject } = useProjectStore()
  const navigate = useNavigate()

  useEffect(() => {
    projectsApi.list().then(setProjects).catch(() => {})
  }, [])

  const createProject = async () => {
    const name = prompt('New project name:')
    if (!name?.trim()) return
    try {
      const p = await projectsApi.create({ name: name.trim() })
      setProjects(prev => [p, ...prev])
      setCurrentProject(p)
      toast.success(`Project "${p.name}" created`)
    } catch (e: any) {
      toast.error(e.message)
    }
  }

  return (
    <header
      className="flex items-center justify-between px-6 py-3 border-b flex-shrink-0"
      style={{ background: '#080d1a', borderColor: '#1e2d45' }}
    >
      <div className="flex items-center gap-2">
        <FolderOpen size={16} style={{ color: '#6366f1' }} />
        <span className="text-sm" style={{ color: '#94a3b8' }}>Active Project:</span>
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors hover:bg-white/5"
            style={{ color: '#e2e8f0', background: '#111827', border: '1px solid #2d3748' }}
          >
            {currentProject?.name ?? 'Select project…'}
            <ChevronDown size={14} />
          </button>
          {showDropdown && (
            <div
              className="absolute top-full mt-1 left-0 z-50 rounded-lg shadow-xl min-w-48 py-1"
              style={{ background: '#1a2035', border: '1px solid #2d3748' }}
            >
              {projects.length === 0 && (
                <div className="px-4 py-2 text-sm" style={{ color: '#94a3b8' }}>No projects yet</div>
              )}
              {projects.map(p => (
                <button
                  key={p.id}
                  onClick={() => { setCurrentProject(p); setShowDropdown(false) }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors"
                  style={{ color: p.id === currentProject?.id ? '#818cf8' : '#e2e8f0' }}
                >
                  {p.name}
                </button>
              ))}
              <hr style={{ borderColor: '#2d3748', margin: '4px 0' }} />
              <button
                onClick={() => { navigate('/app/projects'); setShowDropdown(false) }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors"
                style={{ color: '#6366f1' }}
              >
                Manage projects…
              </button>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={createProject}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors"
        style={{ background: '#6366f1', color: 'white' }}
      >
        <Plus size={14} />
        New Project
      </button>
    </header>
  )
}
