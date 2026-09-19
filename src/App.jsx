import { Routes, Route, Navigate } from 'react-router-dom'
import { Sidebar } from './Components/Sidebar'
import { Header } from './Components/Header'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { Tickets } from './pages/Tickets'
import { CreateTicket } from './pages/CreateTicket'
import { TicketDetails } from './pages/TicketDetails'

export default function App() {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />

      <Route
        path="/*"
        element={
          <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
              <Header />
              <main className="flex-1 overflow-y-auto">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/tickets" element={<Tickets />} />
                  <Route path="/tickets/:id" element={<TicketDetails />} />
                  <Route path="/create-ticket" element={<CreateTicket />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </main>
            </div>
          </div>
        }
      />
    </Routes>
  )
}