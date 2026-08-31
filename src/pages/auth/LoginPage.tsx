import { type SubmitEvent, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ApiError } from '../../api/client'
import { useAuth } from '../../auth/AuthProvider'
import { AuthCard } from '../../components/auth/AuthCard'
import { AuthError } from '../../components/auth/AuthError'
import { AuthInput } from '../../components/auth/AuthInput'

export function LoginPage() {
  const navigate = useNavigate()
  const { login, user } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (user) {
    return <Navigate to="/product" replace />
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await login({ username, password })
      navigate('/product')
    } catch (submitError) {
      if (submitError instanceof ApiError) {
        setError('Invalid username or password. Try emilys / emilyspass.')
      } else {
        setError('Unable to sign in. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthCard onSubmit={handleSubmit}>
      <header className="flex flex-col gap-2">
        <h1 className="text-[34px] font-bold leading-[1.05] text-text-primary">Welcome back</h1>
        <p className="text-[15px] leading-[1.45] text-text-secondary">
          Sign in to continue shopping.
        </p>
      </header>

      {error && <AuthError message={error} />}

      <div className="flex flex-col gap-4">
        <AuthInput
          label="Username"
          value={username}
          onChange={setUsername}
          placeholder="emilys"
          autoComplete="username"
        />
        <AuthInput
          label="Password"
          value={password}
          onChange={setPassword}
          placeholder="Password"
          autoComplete="current-password"
          showPasswordToggle
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex h-13 w-full items-center justify-center rounded-[14px] bg-primary px-6 text-[17px] font-semibold leading-[1.45] text-surface disabled:opacity-70"
      >
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </button>

      <p className="flex items-start justify-center gap-1.5 text-[15px] leading-[1.45]">
        <span className="text-text-secondary">Need an account?</span>
        <Link to="/register" className="font-semibold text-primary">
          Create account
        </Link>
      </p>

      <p className="text-center text-[13px] leading-[1.45] text-text-secondary">
        Demo credentials: emilys / emilyspass
      </p>
    </AuthCard>
  )
}
