import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { StatusBadge } from '../Components/StatusBadge'
import { PriorityBadge } from '../Components/PriorityBadge'

export const TicketDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [ticket, setTicket] = useState(null)
  const [status, setStatus] = useState('')
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'Rahul Patel (Support)',
      text: 'We are investigating the issue and checking the server logs.',
      date: '2026-09-12 10:00 AM'
    }
  ])
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('tickets') || '[]')
    const found = saved.find((t) => t.id === Number(id))
    if (found) {
      setTicket(found)
      setStatus(found.status)
    }
  }, [id])

  const handleStatusUpdate = () => {
    const saved = JSON.parse(localStorage.getItem('tickets') || '[]')
    const updated = saved.map((t) => (t.id === Number(id) ? { ...t, status } : t))
    localStorage.setItem('tickets', JSON.stringify(updated))
    setTicket({ ...ticket, status })
    alert('Ticket Status Successfully Updated!')
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const commentObj = {
      id: Date.now(),
      user: 'You',
      text: newComment,
      date: new Date().toLocaleString()
    }

    setComments([...comments, commentObj])
    setNewComment('')
    alert('Comment added successfully!')
  }

  if (!ticket) {
    return <div className="p-8 text-slate-600">Loading ticket details...</div>
  }

  return (
    <div className="p-8 max-w-4xl">
      <button 
        onClick={() => navigate('/tickets')} 
        className="text-sm text-slate-500 mb-4 hover:underline flex items-center gap-1"
      >
        ← Back to Tickets
      </button>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-xs font-mono text-slate-400">{ticket.ticket_id}</span>
            <h1 className="text-xl font-bold text-slate-800">{ticket.subject}</h1>
          </div>
          <div className="flex gap-2">
            <PriorityBadge priority={ticket.priority} />
            <StatusBadge status={ticket.status} />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Description</h3>
          <p className="text-slate-700 text-sm bg-slate-50 p-4 rounded-lg border border-slate-100 whitespace-pre-line">
            {ticket.description}
          </p>
        </div>

        <div className="pt-6 border-t border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-4 text-base">Activity & Comments</h3>

          <div className="space-y-3 mb-5">
            {comments.map((c) => (
              <div key={c.id} className="bg-slate-50 p-3 rounded-lg border border-slate-200/60 text-xs">
                <div className="flex justify-between font-medium text-slate-800 mb-1">
                  <span>{c.user}</span>
                  <span className="text-slate-400 text-[11px]">{c.date}</span>
                </div>
                <p className="text-slate-600 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddComment} className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Write a comment or update..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 border border-slate-300 rounded-lg px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Post
            </button>
          </form>
        </div>

        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-slate-700">Update Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <button
            onClick={handleStatusUpdate}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-1.5 rounded-lg text-sm font-medium shadow transition"
          >
            Save Status
          </button>
        </div>
      </div>
    </div>
  )
}