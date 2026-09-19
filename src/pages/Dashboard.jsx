import { useEffect, useState } from 'react'
import mockData from '../data/mockData.json'
import { StatusBadge } from '../Components/StatusBadge'
import { PriorityBadge } from '../Components/PriorityBadge'

export const Dashboard = () => {
  const [tickets, setTickets] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('tickets')
    if (saved) {
      setTickets(JSON.parse(saved))
    } else {
      setTickets(mockData.tickets)
      localStorage.setItem('tickets', JSON.stringify(mockData.tickets))
    }
  }, [])

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'Open').length,
    inProgress: tickets.filter(t => t.status === 'In Progress').length,
    resolved: tickets.filter(t => t.status === 'Resolved').length,
    closed: tickets.filter(t => t.status === 'Closed').length,
    high: tickets.filter(t => t.priority === 'High').length,
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Dashboard</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <p className="text-xs font-medium text-slate-500">Total Tickets</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-blue-500">
          <p className="text-xs font-medium text-slate-500">Open</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{stats.open}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-amber-500">
          <p className="text-xs font-medium text-slate-500">In Progress</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">{stats.inProgress}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-emerald-500">
          <p className="text-xs font-medium text-slate-500">Resolved</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{stats.resolved}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-slate-400">
          <p className="text-xs font-medium text-slate-500">Closed</p>
          <p className="text-2xl font-bold text-slate-600 mt-1">{stats.closed}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-red-500">
          <p className="text-xs font-medium text-slate-500">High Priority</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{stats.high}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-800">Recent Tickets</h3>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
            <tr>
              <th className="p-4">Ticket ID</th>
              <th className="p-4">Subject</th>
              <th className="p-4">Priority</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tickets.slice(0, 5).map((t) => (
              <tr key={t.id} className="hover:bg-slate-50">
                <td className="p-4 font-mono font-medium text-slate-900">{t.ticket_id}</td>
                <td className="p-4 text-slate-800">{t.subject}</td>
                <td className="p-4"><PriorityBadge priority={t.priority} /></td>
                <td className="p-4"><StatusBadge status={t.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}