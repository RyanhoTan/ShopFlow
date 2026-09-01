import { useQuery } from '@tanstack/react-query'
import { Link, Navigate } from 'react-router-dom'
import { getUserOrderStats, getUserProfile } from '../../api/profile'
import { useAuth } from '../../auth/AuthProvider'
import { ProfileMetric, ProfileSection, type ProfileField } from '../../components/profile/ProfileSection'
import type { UserProfile } from '../../types/profile'

function formatBirthday(birthDate: string): string {
  const [year, month, day] = birthDate.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatGender(gender: string): string {
  return gender.charAt(0).toUpperCase() + gender.slice(1)
}

function formatRole(role: string): string {
  return role.charAt(0).toUpperCase() + role.slice(1)
}

function formatCityLine(profile: UserProfile): string {
  const { city, stateCode, postalCode } = profile.address
  return `${city}, ${stateCode} ${postalCode}`
}

function formatCard(profile: UserProfile): string {
  const last4 = profile.bank.cardNumber.slice(-4)
  return `${profile.bank.cardType}  •••• ${last4}`
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount)
}

function displayUniversity(university: string): string {
  return university.replaceAll('--', '–')
}

function buildProfileSections(profile: UserProfile): ProfileField[][] {
  return [
    [
      { key: 'email', label: 'Email', value: profile.email, editTo: '/profile/edit/email' },
      { key: 'phone', label: 'Phone', value: profile.phone, editTo: '/profile/edit/phone' },
    ],
    [
      {
        key: 'birthday',
        label: 'Birthday',
        value: formatBirthday(profile.birthDate),
        editTo: '/profile/edit/birthday',
      },
      { key: 'age', label: 'Age', value: String(profile.age) },
      {
        key: 'gender',
        label: 'Gender',
        value: formatGender(profile.gender),
        editTo: '/profile/edit/gender',
      },
    ],
    [
      {
        key: 'street',
        label: 'Street',
        value: profile.address.address,
        editTo: '/profile/edit/street',
      },
      { key: 'city', label: 'City', value: formatCityLine(profile), editTo: '/profile/edit/city' },
      {
        key: 'country',
        label: 'Country',
        value: profile.address.country,
        editTo: '/profile/edit/country',
      },
    ],
    [
      {
        key: 'title',
        label: 'Title',
        value: profile.company.title,
        editTo: '/profile/edit/title',
      },
      {
        key: 'company',
        label: 'Company',
        value: profile.company.name,
        editTo: '/profile/edit/company',
      },
      {
        key: 'department',
        label: 'Department',
        value: profile.company.department,
        editTo: '/profile/edit/department',
      },
      {
        key: 'university',
        label: 'University',
        value: displayUniversity(profile.university),
        editTo: '/profile/edit/university',
      },
    ],
    [
      { key: 'card', label: 'Card', value: formatCard(profile) },
      {
        key: 'expires',
        label: 'Expires',
        value: profile.bank.cardExpire,
        editTo: '/profile/edit/expires',
      },
      {
        key: 'currency',
        label: 'Currency',
        value: profile.bank.currency,
        editTo: '/profile/edit/currency',
      },
    ],
  ]
}

const SECTION_TITLES = ['Contact', 'Personal', 'Address', 'Work', 'Payment'] as const

function ProfileSkeleton() {
  return (
    <main
      className="min-h-0 flex-1 overflow-y-auto bg-page"
      aria-busy="true"
      aria-label="Loading profile"
    >
      <div className="mx-auto flex w-full max-w-240 flex-col gap-6 px-8 py-8">
        <div className="flex flex-col gap-2">
          <div className="skeleton h-9 w-40 rounded-full" />
          <div className="skeleton h-5.5 w-72 rounded-full" />
        </div>
        <div className="skeleton h-38 rounded-[20px]" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="skeleton h-22 rounded-[20px]" />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="skeleton h-44 rounded-[20px]" />
          ))}
        </div>
      </div>
    </main>
  )
}

export function ProfilePage() {
  const { user, logout, isInitializing } = useAuth()

  const profileQuery = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => getUserProfile(user!.id),
    enabled: Boolean(user),
  })

  const ordersQuery = useQuery({
    queryKey: ['profile-orders', user?.id],
    queryFn: () => getUserOrderStats(user!.id),
    enabled: Boolean(user),
  })

  if (isInitializing) {
    return <ProfileSkeleton />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (profileQuery.isLoading || ordersQuery.isLoading) {
    return <ProfileSkeleton />
  }

  if (profileQuery.error || ordersQuery.error || !profileQuery.data || !ordersQuery.data) {
    return (
      <main className="flex min-h-0 flex-1 items-center justify-center bg-page p-12 text-[15px] text-text-secondary">
        Failed to load profile.
      </main>
    )
  }

  const profile = profileQuery.data
  const orders = ordersQuery.data
  const sections = buildProfileSections(profile)
  const fullName = `${profile.firstName} ${profile.lastName}`

  return (
    <main className="min-h-0 flex-1 overflow-y-auto bg-page">
      <div className="mx-auto flex w-full max-w-240 flex-col gap-6 px-8 py-8 pb-12">
        <header className="flex flex-col gap-2">
          <h1 className="text-[34px] font-bold leading-[1.05] text-text-primary">Account</h1>
          <p className="text-[15px] leading-[1.45] text-text-secondary">
            Your profile, addresses, and orders
          </p>
        </header>

        <section className="flex items-center gap-6 rounded-[20px] bg-surface p-8">
          <img
            src={profile.image}
            alt={fullName}
            className="size-22 shrink-0 rounded-full bg-active object-cover"
          />
          <div className="min-w-0 flex-1">
            <h2 className="text-[34px] font-bold leading-[1.05] text-text-primary">{fullName}</h2>
            <div className="mt-2 flex flex-wrap items-center gap-2.5">
              <span className="text-[15px] leading-[1.45] text-text-secondary">
                @{profile.username}
              </span>
              <span className="rounded-lg bg-active px-2 py-0.5 text-[13px] font-semibold leading-[1.45] text-primary">
                {formatRole(profile.role)}
              </span>
            </div>
          </div>
          <Link
            to="/profile/edit"
            className="flex h-10 shrink-0 items-center justify-center rounded-[14px] bg-input px-4 text-[15px] font-semibold leading-[1.45] text-text-primary"
          >
            Edit
          </Link>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="px-1 text-[13px] font-semibold uppercase tracking-wide text-text-secondary">
            Orders
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <ProfileMetric value={orders.orderCount} label="Order" />
            <ProfileMetric value={orders.itemCount} label="Items" />
            <ProfileMetric value={formatCurrency(orders.total)} label="Total" />
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {sections.slice(0, 4).map((fields, index) => (
            <ProfileSection key={SECTION_TITLES[index]} title={SECTION_TITLES[index]} fields={fields} />
          ))}
        </div>

        <ProfileSection title={SECTION_TITLES[4]} fields={sections[4]} />

        <section className="overflow-hidden rounded-[20px] bg-surface">
          <button
            type="button"
            onClick={logout}
            className="flex h-14 w-full items-center justify-center text-[15px] font-semibold leading-[1.45] text-danger"
          >
            Sign Out
          </button>
        </section>
      </div>
    </main>
  )
}
