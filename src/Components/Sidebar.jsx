import { Link, useLocation } from 'react-router-dom'
import { FiHome, FiLifeBuoy, FiPlusCircle, FiLogOut } from 'react-icons/fi'

export const Sidebar = () => {
  const location = useLocation()
  const isActive = (path) => location.pathname === path ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col min-h-screen">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <FiLifeBuoy className="text-indigo-400 text-2xl" />
        <h1 className="font-bold text-xl tracking-wide">HelpDesk</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link to="/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${isActive('/dashboard')}`}>
          <FiHome size={18} /> Dashboard
        </Link>
        <Link to="/tickets" className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${isActive('/tickets')}`}>
          <FiLifeBuoy size={18} /> Tickets
        </Link>
        <Link to="/create-ticket" className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${isActive('/create-ticket')}`}>
          <FiPlusCircle size={18} /> Create Ticket
        </Link>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <Link to="/login" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:bg-slate-800 rounded-lg w-full transition">
          <FiLogOut size={18} /> Logout
        </Link>
      </div>
    </aside>
  )
}