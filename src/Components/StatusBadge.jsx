export const StatusBadge = ({ status }) => {
  
  const badgeStyles = {
    Open: 'bg-blue-100 text-blue-800 border-blue-300',
    'In Progress': 'bg-amber-100 text-amber-800 border-amber-300',
    Resolved: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    Closed: 'bg-slate-100 text-slate-800 border-slate-300',
  }

  // Agar status empty ho ya match na kare toh default 'Open' style lageg
  const currentStyle = badgeStyles[status] || badgeStyles.Open

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${currentStyle}`}
    >
      {status || 'Open'}
    </span>
  )
}