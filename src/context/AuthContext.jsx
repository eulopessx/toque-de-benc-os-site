import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  async function loadAdminProfile(currentUser) {
    if (!currentUser) {
      setProfile(null)
      return
    }

    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', currentUser.email)
        .maybeSingle()

      if (error) {
        console.error('Erro ao verificar admin:', error.message)
        setProfile({
          id: currentUser.id,
          email: currentUser.email,
          role: 'customer',
        })
        return
      }

      if (data) {
        setProfile(data)
      } else {
        setProfile({
          id: currentUser.id,
          email: currentUser.email,
          role: 'customer',
        })
      }
    } catch (error) {
      console.error('Erro inesperado ao verificar admin:', error)
      setProfile({
        id: currentUser.id,
        email: currentUser.email,
        role: 'customer',
      })
    }
  }

  useEffect(() => {
    let active = true

    async function initializeAuth() {
      try {
        const {
          data: { session: currentSession },
          error,
        } = await supabase.auth.getSession()

        if (!active) return

        if (error) {
          console.error('Erro ao carregar sessão:', error.message)
          setSession(null)
          setUser(null)
          setProfile(null)
          setLoading(false)
          return
        }

        setSession(currentSession)
        setUser(currentSession?.user ?? null)

        if (currentSession?.user) {
          await loadAdminProfile(currentSession.user)
        } else {
          setProfile(null)
        }
      } catch (error) {
        console.error('Erro no initializeAuth:', error)
        if (!active) return
        setSession(null)
        setUser(null)
        setProfile(null)
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    initializeAuth()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      if (!active) return

      setSession(newSession)
      setUser(newSession?.user ?? null)

      if (newSession?.user) {
        await loadAdminProfile(newSession.user)
      } else {
        setProfile(null)
      }

      if (active) {
        setLoading(false)
      }
    })

    return () => {
      active = false
      subscription.unsubscribe()
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
        redirectTo: `${window.location.origin}/#/`,
      },
    })
  }

  async function signInWithApple() {
    return supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: `${window.location.origin}/#/`,
      },
    })
  }

  async function signOut() {
    await supabase.auth.signOut()
    setSession(null)
    setUser(null)
    setProfile(null)
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