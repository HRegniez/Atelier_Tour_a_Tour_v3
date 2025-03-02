import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { createClient } from '@supabase/supabase-js'
import './styles.sass'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const supabase = useMemo(() => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
    return createClient(supabaseUrl, supabaseKey)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Login attempt with email:', email)
    setError(null)
    setLoading(true)

    try {
      console.log('Calling Supabase auth.signInWithPassword...')
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log('Supabase response:', { data, error })

      if (error) throw error

      if (data?.user) {
        console.log('Login successful, user:', data.user)
        navigate('/admin') // Redirect 
      }
    } catch (error) {
      console.error('Login error:', error)
      setError(error.message)
    } finally {
      setLoading(false)
      console.log('Login attempt completed')
    }
  }

  return (
    <div className="login">
      <div className="login_container">
        <h1>Login</h1>
        {error && <div className="login_error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="login_field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="login_field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
