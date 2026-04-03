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

  async function handleGoogle() {
    setMessage('')
    const { error } = await signInWithGoogle()
    if (error) {
      setMessage(error.message || 'Erro ao entrar com Google.')
    }
  }

  async function handleApple() {
    setMessage('')
    const { error } = await signInWithApple()
    if (error) {
      setMessage(error.message || 'Erro ao entrar com Apple.')
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 lg:px-8 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2rem] border border-[#ddd0c1] bg-gradient-to-br from-[#24384d] to-[#31506d] p-8 text-white shadow-[0_20px_60px_rgba(36,56,77,0.16)] sm:p-10">
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

        <div className="rounded-[2rem] border border-[#ddd0c1] bg-white p-8 shadow-[0_14px_40px_rgba(36,56,77,0.05)] sm:p-10">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`rounded-full px-5 py-3 text-sm font-semibold ${
                mode === 'login'
                  ? 'bg-[#24384d] text-white'
                  : 'border border-[#d8cbb9] text-[#24384d]'
              }`}
            >
              Entrar
            </button>

            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`rounded-full px-5 py-3 text-sm font-semibold ${
                mode === 'signup'
                  ? 'bg-[#24384d] text-white'
                  : 'border border-[#d8cbb9] text-[#24384d]'
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
                className="w-full rounded-2xl border border-[#ddd0c1] px-4 py-4 outline-none"
              />
            ) : null}

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu e-mail"
              className="w-full rounded-2xl border border-[#ddd0c1] px-4 py-4 outline-none"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sua senha"
              className="w-full rounded-2xl border border-[#ddd0c1] px-4 py-4 outline-none"
            />

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-2xl bg-[#24384d] px-5 py-4 text-sm font-semibold text-white"
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
              onClick={handleGoogle}
              className="rounded-2xl border border-[#ddd0c1] px-5 py-4 text-sm font-semibold text-[#24384d]"
            >
              Continuar com Google
            </button>

            <button
              type="button"
              onClick={handleApple}
              className="rounded-2xl border border-[#ddd0c1] px-5 py-4 text-sm font-semibold text-[#24384d]"
            >
              Continuar com Apple
            </button>
          </div>

          {message ? (
            <p className="mt-5 text-sm text-[#5d6d7d]">{message}</p>
          ) : null}
        </div>
      </div>
    </main>
  )
}