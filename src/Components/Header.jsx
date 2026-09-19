import { useNavigate } from 'react-router-dom'
import { FiBell, FiLogOut, FiUser } from 'react-icons/fi'

export const Header = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{"name": "Guest User", "role": "Employee"}')

  const handleLogout = () => {
    localStorage.removeItem('user')
    alert('Logged out successfully!')
    navigate('/login')
  }

  return (
    <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10 shadow-xs">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">Welcome back, {user.name}</h2>
        <p className="text-xs text-slate-500 capitalize">Role: <span className="font-medium text-indigo-600">{user.role}</span></p>
      </div>

      <div className="flex items-center gap-4">
       
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg relative transition">
          <FiBell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="w-9 h-9 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm">
            <FiUser size={18} />
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs font-medium text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg border border-red-200 transition"
          >
            <FiLogOut size={14} /> Logout
          </button>
        </div>
      </div>
    </header>
  )
}