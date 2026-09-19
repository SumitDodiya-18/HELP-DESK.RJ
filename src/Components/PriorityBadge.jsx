// StatusBadge.jsx
export const StatusBadge = ({ status }) => {
  const styles = {
    Open: 'bg-blue-100 text-blue-700 border-blue-300',
    'In Progress': 'bg-amber-100 text-amber-700 border-amber-300',
    Resolved: 'bg-emerald-100 text-emerald-700 border-emerald-300',
    Closed: 'bg-slate-100 text-slate-700 border-slate-300',
  }
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[status] || styles.Open}`}>
      {status}
    </span>
  )
}

// PriorityBadge.jsx
export const PriorityBadge = ({ priority }) => {
  const styles = {
    High: 'bg-red-100 text-red-700',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-gray-100 text-gray-700',
  }
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[priority] || styles.Low}`}>
      {priority}
    </span>
  )
}