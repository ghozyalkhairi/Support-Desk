export interface UserType {
  name?: string
  email: string
  password: string
  token?: string
}

export interface TicketType {
  _id?: string
  product: string
  description: string
  status?: string
  createdAt?: string
}

export type TicketsType = TicketType[]

export interface NoteType {
  _id?: string
  text: string
  isStaff?: boolean
  createdAt?: string
}

export type NotesType = NoteType[]
