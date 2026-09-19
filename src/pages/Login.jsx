import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiLifeBuoy, FiLock, FiMail } from 'react-icons/fi'

export const Login = () => {
  const [email, setEmail] = useState('support@company.com')
  const [password, setPassword] = useState('123456')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    const user = {
      email,
      role: email.includes('support') ? 'support' : 'employee',
      name: email.includes('support') ? 'Rahul Patel' : 'Amit Shah'
    }
    localStorage.setItem('user', JSON.stringify(user))
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <div className="flex items-center justify-center gap-2 mb-6">
          <FiLifeBuoy className="text-indigo-600 text-3xl" />
          <h1 className="text-2xl font-bold text-slate-800">HelpDesk</h1>
        </div>
        
        <h2 className="text-xl font-semibold text-slate-700 text-center mb-6">Welcome Back</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Email Address</label>
            <div className="relative flex items-center">
              <FiMail className="absolute left-3 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Password</label>
            <div className="relative flex items-center">
              <FiLock className="absolute left-3 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow transition"
          >
            Login
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-200 text-xs text-slate-500 space-y-1">
          <p className="font-semibold text-slate-600">Demo Accounts:</p>
          <p>• Support: <code className="bg-slate-100 px-1 py-0.5 rounded">support@company.com</code> / 123456</p>
          <p>• Employee: <code className="bg-slate-100 px-1 py-0.5 rounded">employee@company.com</code> / 123456</p>
        </div>
      </div>
    </div>
  )
}