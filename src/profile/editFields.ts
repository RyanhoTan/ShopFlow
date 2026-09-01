import type { UserProfile } from '../types/profile'

export type EditFieldKey =
  | 'email'
  | 'phone'
  | 'birthday'
  | 'gender'
  | 'street'
  | 'city'
  | 'country'
  | 'title'
  | 'company'
  | 'department'
  | 'university'
  | 'expires'
  | 'currency'

export type FieldControl = 'text' | 'select' | 'date'

export type SelectOption = {
  label: string
  value: string
}

export type EditFieldConfig = {
  key: EditFieldKey
  title: string
  hint?: string
  control: FieldControl
  options?: SelectOption[]
  getValue: (profile: UserProfile) => string
  buildPayload: (value: string, profile: UserProfile) => Record<string, unknown>
}

const GENDER_OPTIONS: SelectOption[] = [
  { label: 'Female', value: 'female' },
  { label: 'Male', value: 'male' },
  { label: 'Other', value: 'other' },
]

const COUNTRY_OPTIONS: SelectOption[] = [
  { label: 'United States', value: 'United States' },
  { label: 'Canada', value: 'Canada' },
  { label: 'United Kingdom', value: 'United Kingdom' },
  { label: 'Japan', value: 'Japan' },
  { label: 'Germany', value: 'Germany' },
  { label: 'France', value: 'France' },
  { label: 'Australia', value: 'Australia' },
  { label: 'China', value: 'China' },
]

const CURRENCY_OPTIONS: SelectOption[] = [
  { label: 'USD', value: 'USD' },
  { label: 'GBP', value: 'GBP' },
  { label: 'CNY', value: 'CNY' },
  { label: 'EUR', value: 'EUR' },
  { label: 'JPY', value: 'JPY' },
]

export const EDITABLE_FIELD_KEYS: EditFieldKey[] = [
  'email',
  'phone',
  'birthday',
  'gender',
  'street',
  'city',
  'country',
  'title',
  'company',
  'department',
  'university',
  'expires',
  'currency',
]

export const EDIT_FIELD_CONFIG: Record<EditFieldKey, EditFieldConfig> = {
  email: {
    key: 'email',
    title: 'Email',
    hint: "We'll use this email for order updates and account recovery.",
    control: 'text',
    getValue: (profile) => profile.email,
    buildPayload: (value) => ({ email: value }),
  },
  phone: {
    key: 'phone',
    title: 'Phone',
    control: 'text',
    getValue: (profile) => profile.phone,
    buildPayload: (value) => ({ phone: value }),
  },
  birthday: {
    key: 'birthday',
    title: 'Birthday',
    hint: 'Birthday uses a date picker, not free typing. Maps to birthDate in DummyJSON.',
    control: 'date',
    getValue: (profile) => profile.birthDate,
    buildPayload: (value) => ({ birthDate: value }),
  },
  gender: {
    key: 'gender',
    title: 'Gender',
    hint: 'Choose from a fixed list. DummyJSON stores gender as female, male, or other.',
    control: 'select',
    options: GENDER_OPTIONS,
    getValue: (profile) => profile.gender,
    buildPayload: (value) => ({ gender: value }),
  },
  street: {
    key: 'street',
    title: 'Street',
    control: 'text',
    getValue: (profile) => profile.address.address,
    buildPayload: (value, profile) => ({
      address: { ...profile.address, address: value },
    }),
  },
  city: {
    key: 'city',
    title: 'City',
    control: 'text',
    getValue: (profile) => profile.address.city,
    buildPayload: (value, profile) => ({
      address: { ...profile.address, city: value },
    }),
  },
  country: {
    key: 'country',
    title: 'Country',
    hint: 'Country comes from user.address.country in DummyJSON.',
    control: 'select',
    options: COUNTRY_OPTIONS,
    getValue: (profile) => profile.address.country,
    buildPayload: (value, profile) => ({
      address: { ...profile.address, country: value },
    }),
  },
  title: {
    key: 'title',
    title: 'Title',
    control: 'text',
    getValue: (profile) => profile.company.title,
    buildPayload: (value, profile) => ({
      company: { ...profile.company, title: value },
    }),
  },
  company: {
    key: 'company',
    title: 'Company',
    control: 'text',
    getValue: (profile) => profile.company.name,
    buildPayload: (value, profile) => ({
      company: { ...profile.company, name: value },
    }),
  },
  department: {
    key: 'department',
    title: 'Department',
    control: 'text',
    getValue: (profile) => profile.company.department,
    buildPayload: (value, profile) => ({
      company: { ...profile.company, department: value },
    }),
  },
  university: {
    key: 'university',
    title: 'University',
    control: 'text',
    getValue: (profile) => profile.university,
    buildPayload: (value) => ({ university: value }),
  },
  expires: {
    key: 'expires',
    title: 'Expires',
    control: 'text',
    getValue: (profile) => profile.bank.cardExpire,
    buildPayload: (value, profile) => ({
      bank: { ...profile.bank, cardExpire: value },
    }),
  },
  currency: {
    key: 'currency',
    title: 'Currency',
    control: 'select',
    options: CURRENCY_OPTIONS,
    getValue: (profile) => profile.bank.currency,
    buildPayload: (value, profile) => ({
      bank: { ...profile.bank, currency: value },
    }),
  },
}

export function isEditFieldKey(value: string): value is EditFieldKey {
  return value in EDIT_FIELD_CONFIG
}

export function formatGender(gender: string): string {
  return gender.charAt(0).toUpperCase() + gender.slice(1)
}

export function formatBirthdayDisplay(birthDate: string): string {
  const [year, month, day] = birthDate.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
