import { useNavigate } from 'react-router-dom'
import { StatusBadge } from './StatusBadge'
import { PriorityBadge } from './PriorityBadge'

export const TicketCard = ({ ticket }) => {
  const navigate = useNavigate()

  if (!ticket) return null

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        {/* Top Header: Ticket ID, Priority & Status */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="font-mono text-xs font-semibold text-slate-400">
            {ticket.ticket_id}
          </span>
          <div className="flex items-center gap-1.5">
            <PriorityBadge priority={ticket.priority} />
            <StatusBadge status={ticket.status} />
          </div>
        </div>

        <h3 className="font-bold text-slate-800 text-base mb-2 line-clamp-1">
          {ticket.subject}
        </h3>

        <p className="text-slate-600 text-xs mb-4 line-clamp-2 leading-relaxed">
          {ticket.description}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-400">
          {ticket.created_at ? new Date(ticket.created_at).toLocaleDateString() : 'Recent'}
        </span>

        <button
          onClick={() => navigate(`/tickets/${ticket.id}`)}
          className="text-indigo-600 hover:text-indigo-800 font-semibold hover:underline"
        >
          View Details →
        </button>
      </div>
    </div>
  )
}