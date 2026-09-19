import { useNavigate } from 'react-router-dom'
import { StatusBadge } from './StatusBadge'
import { PriorityBadge } from './PriorityBadge'

export const TicketTable = ({ tickets, limit }) => {
  const navigate = useNavigate()
  const displayTickets = limit ? tickets.slice(0, limit) : tickets

  if (displayTickets.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
        No tickets found.
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
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
          {displayTickets.map((t) => (
            <tr key={t.id} className="hover:bg-slate-50 transition-colors">
              <td className="p-4 font-mono font-medium text-slate-900">{t.ticket_id}</td>
              <td className="p-4 text-slate-800 font-medium">{t.subject}</td>
              <td className="p-4"><PriorityBadge priority={t.priority} /></td>
              <td className="p-4"><StatusBadge status={t.status} /></td>
              <td className="p-4">
                <button
                  onClick={() => navigate(`/tickets/${t.id}`)}
                  className="text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-md text-xs font-semibold transition"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}