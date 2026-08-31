import { type SubmitEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthCard } from '../../components/auth/AuthCard'
import { AuthInput } from '../../components/auth/AuthInput'

export function RegisterPage() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <AuthCard onSubmit={handleSubmit}>
      <header className="flex flex-col gap-2">
        <h1 className="text-[34px] font-bold leading-[1.05] text-text-primary">Create account</h1>
        <p className="text-[15px] leading-[1.45] text-text-secondary">
          Join ShopFlow to save items and checkout faster.
        </p>
      </header>

      <div className="flex flex-col gap-4">
        <AuthInput
          label="First name"
          value={firstName}
          onChange={setFirstName}
          placeholder="Emily"
          autoComplete="given-name"
        />
        <AuthInput
          label="Last name"
          value={lastName}
          onChange={setLastName}
          placeholder="Johnson"
          autoComplete="family-name"
        />
        <AuthInput
          label="Email"
          value={email}
          onChange={setEmail}
          placeholder="email@example.com"
          type="email"
          autoComplete="email"
        />
        <AuthInput
          label="Username"
          value={username}
          onChange={setUsername}
          placeholder="username"
          autoComplete="username"
        />
        <AuthInput
          label="Password"
          value={password}
          onChange={setPassword}
          placeholder="Password"
          autoComplete="new-password"
          showPasswordToggle
        />
      </div>

      <button
        type="submit"
        className="flex h-13 w-full items-center justify-center rounded-[14px] bg-primary px-6 text-[17px] font-semibold leading-[1.45] text-surface"
      >
        Create account
      </button>

      <p className="flex items-start justify-center gap-1.5 text-[15px] leading-[1.45]">
        <span className="text-text-secondary">Already have an account?</span>
        <Link to="/login" className="font-semibold text-primary">
          Sign in
        </Link>
      </p>
    </AuthCard>
  )
}
