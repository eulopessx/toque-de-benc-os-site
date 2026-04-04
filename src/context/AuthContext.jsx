import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext(null)

function createCustomerProfile(currentUser) {
  return {
    id: currentUser.id,
    email: currentUser.email,
    role: 'customer',
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  async function loadAdminProfile(currentUser) {
    if (!currentUser) {
      setProfile(null)
      return null
    }

    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', currentUser.email)
        .maybeSingle()

      if (error) {
        console.error('Erro ao verificar admin:', error.message)
        const fallbackProfile = createCustomerProfile(currentUser)
        setProfile(fallbackProfile)
        return fallbackProfile
      }

      if (data) {
        setProfile(data)
        return data
      }

      const fallbackProfile = createCustomerProfile(currentUser)
      setProfile(fallbackProfile)
      return fallbackProfile
    } catch (error) {
      console.error('Erro inesperado ao verificar admin:', error)
      const fallbackProfile = createCustomerProfile(currentUser)
      setProfile(fallbackProfile)
      return fallbackProfile
    }
  }

  async function applySession(newSession) {
    setSession(newSession)
    setUser(newSession?.user ?? null)

    if (newSession?.user) {
      await loadAdminProfile(newSession.user)
    } else {
      setProfile(null)
    }
  }

  async function refreshAuthState() {
    setLoading(true)

    try {
      const {
        data: { session: currentSession },
        error,
      } = await supabase.auth.getSession()

      if (error) {
        console.error('Erro ao carregar sessão:', error.message)
        setSession(null)
        setUser(null)
        setProfile(null)
        return
      }

      await applySession(currentSession)
    } catch (error) {
      console.error('Erro no refreshAuthState:', error)
      setSession(null)
      setUser(null)
      setProfile(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let mounted = true

    async function init() {
      if (!mounted) return
      await refreshAuthState()
    }

    init()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (!mounted) return

      Promise.resolve()
        .then(async () => {
          setLoading(true)
          await applySession(newSession)
        })
        .catch((error) => {
          console.error('Erro no onAuthStateChange:', error)
          setSession(null)
          setUser(null)
          setProfile(null)
        })
        .finally(() => {
          if (mounted) {
            setLoading(false)
          }
        })
    })

    async function handleFocusOrVisibility() {
      if (!mounted) return

      if (document.visibilityState === 'visible') {
        await refreshAuthState()
      }
    }

    window.addEventListener('focus', handleFocusOrVisibility)
    document.addEventListener('visibilitychange', handleFocusOrVisibility)

    return () => {
      mounted = false
      subscription.unsubscribe()
      window.removeEventListener('focus', handleFocusOrVisibility)
      document.removeEventListener('visibilitychange', handleFocusOrVisibility)
    }
  }, [])

  async function signUp(email, password, fullName) {
    return supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })
  }

  async function signIn(email, password) {
    return supabase.auth.signInWithPassword({
      email,
      password,
    })
  }

  async function signInWithGoogle() {
    return supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    })
  }

  async function signInWithApple() {
    return supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: window.location.origin,
      },
    })
  }

  async function signOut() {
    await supabase.auth.signOut()
    setSession(null)
    setUser(null)
    setProfile(null)
    setLoading(false)
  }

  const isAdmin = profile?.role === 'admin'

  const value = useMemo(
    () => ({
      session,
      user,
      profile,
      loading,
      isAdmin,
      signUp,
      signIn,
      signInWithGoogle,
      signInWithApple,
      signOut,
      refreshProfile: () => (user ? loadAdminProfile(user) : null),
      refreshAuthState,
    }),
    [session, user, profile, loading, isAdmin]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth precisa ser usado dentro de AuthProvider')
  }

  return context
}