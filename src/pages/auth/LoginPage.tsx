import { type SubmitEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthCard } from '../../components/auth/AuthCard'
import { AuthInput } from '../../components/auth/AuthInput'

export function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <AuthCard onSubmit={handleSubmit}>
      <header className="flex flex-col gap-2">
        <h1 className="text-[34px] font-bold leading-[1.05] text-text-primary">Welcome back</h1>
        <p className="text-[15px] leading-[1.45] text-text-secondary">
          Sign in to continue shopping.
        </p>
      </header>

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
        className="flex h-13 w-full items-center justify-center rounded-[14px] bg-primary px-6 text-[17px] font-semibold leading-[1.45] text-surface"
      >
        Sign in
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
