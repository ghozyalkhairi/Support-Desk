import { createSlice } from "@reduxjs/toolkit"
import { TicketType } from "../../utils/types"
import { RootState } from "../../app/store"
import { createTicket } from "./ticketThunks"

interface TicketState {
  tickets: TicketType[]
  ticket: TicketType | null
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  message: string
}

const initialState: TicketState = {
  tickets: [],
  ticket: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(createTicket.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(createTicket.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.isSuccess = true
      state.tickets.push(payload)
    })
    builder.addCase(createTicket.rejected, (state, { payload }) => {
      state.isLoading = false
      state.isError = true
      state.message = payload as string
    })
  },
})

export const selectTicket = (state: RootState) => state.tickets
export const { reset } = ticketSlice.actions
export default ticketSlice.reducer
