import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { FolderOpen } from 'lucide-react'
import { useProjectStore } from '../../store/projectStore'
import Button from '../ui/Button'

export default function ProjectGuard({ children }: { children: ReactNode }) {
  const { currentProject } = useProjectStore()
  const navigate = useNavigate()

  if (!currentProject) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
          style={{ background: 'rgba(99,102,241,0.1)' }}
        >
          <FolderOpen size={28} style={{ color: '#6366f1' }} />
        </div>
        <h3 className="font-semibold text-xl mb-2" style={{ color: '#f1f5f9' }}>No project selected</h3>
        <p className="text-sm mb-6 max-w-sm" style={{ color: '#94a3b8' }}>
          Select or create a project to start researching.
        </p>
        <Button onClick={() => navigate('/app/projects')}>Go to Projects</Button>
      </div>
    )
  }

  return <>{children}</>
}
