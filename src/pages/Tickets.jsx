import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StatusBadge } from '../Components/StatusBadge'
import { PriorityBadge } from '../Components/PriorityBadge'
import { FiSearch } from 'react-icons/fi'

export const Tickets = () => {
  const navigate = useNavigate()
  const [tickets, setTickets] = useState([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')

  useEffect(() => {
    const saved = localStorage.getItem('tickets')
    if (saved) setTickets(JSON.parse(saved))
  }, [])

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch = t.subject.toLowerCase().includes(search.toLowerCase()) || t.ticket_id.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter
    const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Tickets List</h2>
        <button 
          onClick={() => navigate('/create-ticket')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow"
        >
          + Create Ticket
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-50">
          <FiSearch className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by ID or Subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="All">All Status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>

        <select 
          value={priorityFilter} 
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="All">All Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
            <tr>
              <th className="p-4">Ticket ID</th>
              <th className="p-4">Subject</th>
              <th className="p-4">Priority</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredTickets.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50">
                <td className="p-4 font-mono font-medium text-slate-900">{t.ticket_id}</td>
                <td className="p-4 text-slate-800 font-medium">{t.subject}</td>
                <td className="p-4"><PriorityBadge priority={t.priority} /></td>
                <td className="p-4"><StatusBadge status={t.status} /></td>
                <td className="p-4">
                  <button
                    onClick={() => navigate(`/tickets/${t.id}`)}
                    className="text-indigo-600 hover:bg-indigo-50 px-3 py-1 rounded-md text-xs font-semibold"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}