import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedAdminRoute({ children }) {
  const { loading, user, isAdmin, profile } = useAuth()

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="rounded-[2rem] border border-[#ddd0c1] bg-white/80 p-8 text-center shadow-[0_14px_40px_rgba(36,56,77,0.05)]">
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a835f]">
            Painel administrativo
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-[#24384d] sm:text-3xl">
            Verificando acesso...
          </h1>
          <p className="mt-3 text-sm leading-7 text-[#5d6d7d]">
            Estamos confirmando as permissões desta conta para liberar o acesso ao painel.
          </p>
        </div>
      </main>
    )
  }

  if (!user) {
    return <Navigate to="/acesso" replace />
  }

  if (!isAdmin) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="rounded-[2rem] border border-[#ddd0c1] bg-white/80 p-8 text-center shadow-[0_14px_40px_rgba(36,56,77,0.05)]">
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a835f]">
            Acesso restrito
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-[#24384d] sm:text-3xl">
            Esta conta não possui permissão de administrador.
          </h1>
          <p className="mt-3 text-sm leading-7 text-[#5d6d7d]">
            Conta identificada: {profile?.email || 'sem e-mail disponível'}.
          </p>
        </div>
      </main>
    )
  }

  return children
}