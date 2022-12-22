export interface UserType {
  name?: string
  email: string
  password: string
  token?: string
}

export interface TicketType {
  product: string
  description: string
  status?: string
}
