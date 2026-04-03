import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AuthPage() {
  const {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithApple,
  } = useAuth()

  const [mode, setMode] = useState('login')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!loading && user) {
    return <Navigate to="/" replace />
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setMessage('')

    try {
      if (mode === 'login') {
        const { error } = await signIn(email, password)
        if (error) throw error
        setMessage('Login realizado com sucesso.')
      } else {
        const { error } = await signUp(email, password, fullName)
        if (error) throw error
        setMessage('Conta criada. Verifique seu e-mail se a confirmação estiver ativa.')
      }
    } catch (error) {
      setMessage(error.message || 'Não foi possível continuar.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 lg:px-8 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2rem] border border-[#ddd0c1] bg-gradient-to-br from-[#24384d] to-[#31506d] p-8 text-white shadow-[0_20px_60px_rgba(36,56,77,0.16)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(36,56,77,0.22)] sm:p-10">
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d9cdbd]">
            Acesso à conta
          </div>

          <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Entre ou crie sua conta para acompanhar seus pedidos e comprar com mais facilidade.
          </h1>

          <p className="mt-5 text-sm leading-7 text-white/80 sm:text-base">
            Você poderá usar e-mail e senha ou continuar com Google e Apple.
          </p>
        </div>

        <div className="rounded-[2rem] border border-[#ddd0c1] bg-white p-8 shadow-[0_14px_40px_rgba(36,56,77,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(36,56,77,0.10)] sm:p-10">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24384d]/30 focus-visible:ring-offset-2 active:scale-[0.97] ${
                mode === 'login'
                  ? 'bg-[#24384d] text-white shadow-[0_10px_25px_rgba(36,56,77,0.22)] hover:-translate-y-0.5 hover:bg-[#1d3042] hover:shadow-[0_14px_30px_rgba(36,56,77,0.28)]'
                  : 'border border-[#d8cbb9] text-[#24384d] hover:-translate-y-0.5 hover:border-[#cbbba7] hover:bg-[#fcfaf7] hover:shadow-[0_8px_20px_rgba(36,56,77,0.08)]'
              }`}
            >
              Entrar
            </button>

            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24384d]/30 focus-visible:ring-offset-2 active:scale-[0.97] ${
                mode === 'signup'
                  ? 'bg-[#24384d] text-white shadow-[0_10px_25px_rgba(36,56,77,0.22)] hover:-translate-y-0.5 hover:bg-[#1d3042] hover:shadow-[0_14px_30px_rgba(36,56,77,0.28)]'
                  : 'border border-[#d8cbb9] text-[#24384d] hover:-translate-y-0.5 hover:border-[#cbbba7] hover:bg-[#fcfaf7] hover:shadow-[0_8px_20px_rgba(36,56,77,0.08)]'
              }`}
            >
              Criar conta
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {mode === 'signup' ? (
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Seu nome"
                className="w-full rounded-2xl border border-[#ddd0c1] bg-white px-4 py-4 text-[#24384d] outline-none transition-all duration-200 placeholder:text-[#8a8f96] hover:border-[#cdbda8] focus:border-[#24384d] focus:bg-[#fffdfa] focus:shadow-[0_0_0_4px_rgba(36,56,77,0.08)]"
              />
            ) : null}

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu e-mail"
              className="w-full rounded-2xl border border-[#ddd0c1] bg-white px-4 py-4 text-[#24384d] outline-none transition-all duration-200 placeholder:text-[#8a8f96] hover:border-[#cdbda8] focus:border-[#24384d] focus:bg-[#fffdfa] focus:shadow-[0_0_0_4px_rgba(36,56,77,0.08)]"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sua senha"
              className="w-full rounded-2xl border border-[#ddd0c1] bg-white px-4 py-4 text-[#24384d] outline-none transition-all duration-200 placeholder:text-[#8a8f96] hover:border-[#cdbda8] focus:border-[#24384d] focus:bg-[#fffdfa] focus:shadow-[0_0_0_4px_rgba(36,56,77,0.08)]"
            />

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-2xl bg-[#24384d] px-5 py-4 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(36,56,77,0.20)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#1d3042] hover:shadow-[0_16px_34px_rgba(36,56,77,0.28)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24384d]/30 focus-visible:ring-offset-2 active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {submitting
                ? 'Processando...'
                : mode === 'login'
                ? 'Entrar'
                : 'Criar conta'}
            </button>
          </form>

          <div className="mt-6 grid gap-3">
            <button
              type="button"
              onClick={signInWithGoogle}
              className="group rounded-2xl border border-[#ddd0c1] bg-white px-5 py-4 text-sm font-semibold text-[#24384d] shadow-[0_8px_20px_rgba(36,56,77,0.04)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#cdbda8] hover:bg-[#fcfaf7] hover:shadow-[0_14px_28px_rgba(36,56,77,0.10)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24384d]/30 focus-visible:ring-offset-2 active:scale-[0.985]"
            >
              <span className="inline-flex items-center gap-2 transition-transform duration-200 group-hover:translate-x-0.5">
                Continuar com Google
              </span>
            </button>

            <button
              type="button"
              onClick={signInWithApple}
              className="group rounded-2xl border border-[#ddd0c1] bg-white px-5 py-4 text-sm font-semibold text-[#24384d] shadow-[0_8px_20px_rgba(36,56,77,0.04)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#cdbba8] hover:bg-[#fcfaf7] hover:shadow-[0_14px_28px_rgba(36,56,77,0.10)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24384d]/30 focus-visible:ring-offset-2 active:scale-[0.985]"
            >
              <span className="inline-flex items-center gap-2 transition-transform duration-200 group-hover:translate-x-0.5">
                Continuar com Apple
              </span>
            </button>
          </div>

          {message ? (
            <p className="mt-5 rounded-2xl border border-[#e4d8c9] bg-[#fcfaf7] px-4 py-3 text-sm text-[#5d6d7d]">
              {message}
            </p>
          ) : null}
        </div>
      </div>
    </main>
  )
}