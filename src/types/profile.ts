export type UserAddress = {
  address: string
  city: string
  state: string
  stateCode: string
  postalCode: string
  country: string
}

export type UserBank = {
  cardExpire: string
  cardNumber: string
  cardType: string
  currency: string
}

export type UserCompany = {
  department: string
  name: string
  title: string
}

export type UserProfile = {
  id: number
  firstName: string
  lastName: string
  age: number
  gender: string
  email: string
  phone: string
  username: string
  birthDate: string
  image: string
  role: string
  address: UserAddress
  bank: UserBank
  company: UserCompany
  university: string
}

export type UserCart = {
  id: number
  totalProducts: number
  discountedTotal: number
  products: Array<{ quantity: number }>
}

export type UserOrderStats = {
  orderCount: number
  itemCount: number
  total: number
}
