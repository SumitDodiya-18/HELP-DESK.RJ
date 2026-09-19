// Auto Generate Ticket ID (e.g. TCK-8492)
export const generateTicketId = () => {
  const randomNum = Math.floor(1000 + Math.random() * 9000)
  return `TCK-${randomNum}`
}

export const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}