import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Discover from './pages/Discover'
import Upload from './pages/Upload'
import Chat from './pages/Chat'
import LiteratureReview from './pages/LiteratureReview'
import GapExplorer from './pages/GapExplorer'
import TrendRadar from './pages/TrendRadar'
import GraphView from './pages/GraphView'
import Roadmap from './pages/Roadmap'
import Projects from './pages/Projects'
import Settings from './pages/Settings'
import AppLayout from './components/layout/AppLayout'

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a2035',
            color: '#e2e8f0',
            border: '1px solid #2d3748',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="discover" element={<Discover />} />
          <Route path="upload" element={<Upload />} />
          <Route path="chat" element={<Chat />} />
          <Route path="review" element={<LiteratureReview />} />
          <Route path="gaps" element={<GapExplorer />} />
          <Route path="trends" element={<TrendRadar />} />
          <Route path="graph" element={<GraphView />} />
          <Route path="roadmap" element={<Roadmap />} />
          <Route path="projects" element={<Projects />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
