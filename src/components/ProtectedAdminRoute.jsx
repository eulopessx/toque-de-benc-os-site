import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedAdminRoute({ children }) {
  const { loading, user, isAdmin } = useAuth()

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 text-[#24384d]">
        Carregando...
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/acesso" replace />
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />
  }

  return children
}