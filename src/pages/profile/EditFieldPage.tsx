import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { getUserProfile } from '../../api/profile'
import { useAuth } from '../../auth/AuthProvider'
import { EditDatePicker } from '../../components/profile/EditDatePicker'
import { EditFieldCard, EditHint } from '../../components/profile/EditFieldCard'
import { EditNav } from '../../components/profile/EditNav'
import { EditSelect } from '../../components/profile/EditSelect'
import { EditTextInput } from '../../components/profile/EditTextInput'
import {
  EDIT_FIELD_CONFIG,
  isEditFieldKey,
  type EditFieldKey,
} from '../../profile/editFields'
import { useProfileSave } from '../../profile/useProfileSave'

function EditFieldSkeleton() {
  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-hidden bg-page" aria-busy="true">
      <div className="skeleton h-14 shrink-0" />
      <div className="mx-auto w-full max-w-240 px-8 py-6">
        <div className="skeleton h-22 rounded-[20px]" />
      </div>
    </main>
  )
}

export function EditFieldPage() {
  const { fieldKey } = useParams()
  const { user, isInitializing } = useAuth()
  const saveMutation = useProfileSave()

  const profileQuery = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => getUserProfile(user!.id),
    enabled: Boolean(user),
  })

  const [value, setValue] = useState('')
  const [initialized, setInitialized] = useState(false)

  if (!fieldKey || !isEditFieldKey(fieldKey)) {
    return <Navigate to="/profile" replace />
  }

  const config = EDIT_FIELD_CONFIG[fieldKey as EditFieldKey]

  useEffect(() => {
    if (!profileQuery.data || initialized) {
      return
    }

    setValue(EDIT_FIELD_CONFIG[fieldKey as EditFieldKey].getValue(profileQuery.data))
    setInitialized(true)
  }, [profileQuery.data, initialized, fieldKey])

  if (isInitializing || profileQuery.isLoading) {
    return <EditFieldSkeleton />
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
  const originalValue = config.getValue(profile)
  const hasChanges = value !== originalValue

  function handleSave() {
    if (!user) {
      return
    }

    saveMutation.mutate({
      userId: user.id,
      data: config.buildPayload(value, profile),
    })
  }

  function renderControl() {
    switch (config.control) {
      case 'select':
        return (
          <EditSelect
            value={value}
            options={config.options ?? []}
            onChange={setValue}
          />
        )
      case 'date':
        return <EditDatePicker value={value} onChange={setValue} />
      default:
        return (
          <EditTextInput
            value={value}
            onChange={setValue}
            type={fieldKey === 'email' ? 'email' : fieldKey === 'phone' ? 'tel' : 'text'}
            autoFocus
          />
        )
    }
  }

  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-hidden bg-page">
      <EditNav
        title={config.title}
        onSave={handleSave}
        isSaving={saveMutation.isPending}
        saveDisabled={!hasChanges}
      />

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-240 flex-col gap-4 px-8 py-6 pb-12">
          <EditFieldCard>{renderControl()}</EditFieldCard>
          {config.hint && <EditHint>{config.hint}</EditHint>}
        </div>
      </div>
    </main>
  )
}
