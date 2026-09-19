/**
 * Mock API Service layer using LocalStorage
 * (Easily replaceable with Axios/Fetch for Real Backend)
 */

import mockData from '../data/mockData.json'

// Initial LocalStorage Data setup function
const initializeData = () => {
  const existing = localStorage.getItem('tickets')
  if (!existing) {
    localStorage.setItem('tickets', JSON.stringify(mockData.tickets))
  }
}

initializeData()

export const ticketApi = {
 
  getAllTickets: async () => {
    const data = localStorage.getItem('tickets')
    return JSON.parse(data || '[]')
  },

  getTicketById: async (id) => {
    const data = JSON.parse(localStorage.getItem('tickets') || '[]')
    const ticket = data.find((t) => t.id === Number(id))
    if (!ticket) throw new Error('Ticket not found')
    return ticket
  },

  createTicket: async (newTicket) => {
    const data = JSON.parse(localStorage.getItem('tickets') || '[]')
    const updatedData = [newTicket, ...data]
    localStorage.setItem('tickets', JSON.stringify(updatedData))
    return newTicket
  },

  updateTicketStatus: async (id, newStatus) => {
    const data = JSON.parse(localStorage.getItem('tickets') || '[]')
    const updatedData = data.map((ticket) =>
      ticket.id === Number(id) ? { ...ticket, status: newStatus } : ticket
    )
    localStorage.setItem('tickets', JSON.stringify(updatedData))
    return { id, status: newStatus }
  },

  deleteTicket: async (id) => {
    const data = JSON.parse(localStorage.getItem('tickets') || '[]')
    const filteredData = data.filter((ticket) => ticket.id !== Number(id))
    localStorage.setItem('tickets', JSON.stringify(filteredData))
    return { success: true, id }
  }
}