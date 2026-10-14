import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

export default function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0a0f1e' }}>
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-auto p-6" style={{ background: '#0d1628' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
