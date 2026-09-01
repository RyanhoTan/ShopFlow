import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { Navigate } from 'react-router-dom'
import { getUserProfile } from '../../api/profile'
import { useAuth } from '../../auth/AuthProvider'
import { EditFieldCard, EditHint } from '../../components/profile/EditFieldCard'
import { EditLabeledInput } from '../../components/profile/EditLabeledInput'
import { EditNav } from '../../components/profile/EditNav'
import { useProfileSave } from '../../profile/useProfileSave'

function EditProfileSkeleton() {
  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-hidden bg-page" aria-busy="true">
      <div className="skeleton h-14 shrink-0" />
      <div className="mx-auto flex w-full max-w-240 flex-1 flex-col gap-6 px-8 py-6">
        <div className="skeleton mx-auto size-22 rounded-full" />
        <div className="skeleton h-72 rounded-[20px]" />
      </div>
    </main>
  )
}

export function EditProfilePage() {
  const { user, isInitializing } = useAuth()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const saveMutation = useProfileSave()

  const profileQuery = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => getUserProfile(user!.id),
    enabled: Boolean(user),
  })

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [image, setImage] = useState('')
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (!profileQuery.data || initialized) {
      return
    }

    setFirstName(profileQuery.data.firstName)
    setLastName(profileQuery.data.lastName)
    setUsername(profileQuery.data.username)
    setImage(profileQuery.data.image)
    setInitialized(true)
  }, [profileQuery.data, initialized])

  if (isInitializing || profileQuery.isLoading) {
    return <EditProfileSkeleton />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (profileQuery.error || !profileQuery.data) {
    return (
      <main className="flex min-h-0 flex-1 items-center justify-center bg-page p-12 text-[15px] text-text-secondary">
        Failed to load profile.
      </main>
    )
  }

  const profile = profileQuery.data
  const hasChanges =
    firstName !== profile.firstName ||
    lastName !== profile.lastName ||
    username !== profile.username ||
    image !== profile.image

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImage(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  function handleSave() {
    if (!user) {
      return
    }

    saveMutation.mutate({
      userId: user.id,
      syncAuth: true,
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        username: username.trim(),
        image,
      },
    })
  }

  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-hidden bg-page">
      <EditNav
        title="Edit Profile"
        onSave={handleSave}
        isSaving={saveMutation.isPending}
        saveDisabled={!hasChanges}
      />

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-240 flex-col gap-6 px-8 py-6 pb-12">
          <section className="flex flex-col items-center gap-3">
            <img
              src={image}
              alt={`${firstName} ${lastName}`}
              className="size-22 rounded-full bg-active object-cover"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-[15px] font-semibold leading-[1.45] text-primary"
            >
              Change Photo
            </button>
          </section>

          <EditFieldCard>
            <div className="flex flex-col gap-4">
              <EditLabeledInput
                label="First Name"
                value={firstName}
                placeholder="First name"
                onChange={setFirstName}
              />
              <EditLabeledInput
                label="Last Name"
                value={lastName}
                placeholder="Last name"
                onChange={setLastName}
              />
              <EditLabeledInput
                label="Username"
                value={username}
                placeholder="Username"
                onChange={setUsername}
              />
            </div>
          </EditFieldCard>

          <EditHint>
            Contact, address, and work details are edited individually from your profile.
          </EditHint>
        </div>
      </div>
    </main>
  )
}
