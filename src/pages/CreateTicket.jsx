import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateTicketForm } from '../utils/validation'
import { generateTicketId } from '../utils/ticketUtils'

export const CreateTicket = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    priority: 'Medium'
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { isValid, errors: validationErrors } = validateTicketForm(formData)

    if (!isValid) {
      setErrors(validationErrors)
      return
    }

    const newTicket = {
      id: Date.now(),
      ticket_id: generateTicketId(),
      subject: formData.subject.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      status: 'Open',
      created_at: new Date().toISOString()
    }

    const existingTickets = JSON.parse(localStorage.getItem('tickets') || '[]')
    localStorage.setItem('tickets', JSON.stringify([newTicket, ...existingTickets]))

    alert('Ticket Created Successfully!')
    navigate('/tickets')
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Create New Support Ticket</h2>
        <button
          onClick={() => navigate('/tickets')}
          className="text-sm text-slate-500 hover:text-slate-800 hover:underline"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-5">
       
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="e.g. Unable to access company Wi-Fi"
            className={`w-full px-4 py-2.5 border rounded-lg text-sm outline-none transition ${
              errors.subject
                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-slate-300 focus:ring-2 focus:ring-indigo-500'
            }`}
          />
          {errors.subject && (
            <p className="text-red-500 text-xs mt-1 font-medium">{errors.subject}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Priority <span className="text-red-500">*</span>
          </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="Low">Low - General query or non-urgent request</option>
            <option value="Medium">Medium - Regular work impacted</option>
            <option value="High">High - Critical issue requiring immediate action</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            rows={5}
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide a detailed explanation of the problem, steps to reproduce, or error messages..."
            className={`w-full px-4 py-2.5 border rounded-lg text-sm outline-none transition ${
              errors.description
                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-slate-300 focus:ring-2 focus:ring-indigo-500'
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1 font-medium">{errors.description}</p>
          )}
        </div>

        <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => navigate('/tickets')}
            className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-lg shadow-sm transition"
          >
            Submit Ticket
          </button>
        </div>
      </form>
    </div>
  )
}