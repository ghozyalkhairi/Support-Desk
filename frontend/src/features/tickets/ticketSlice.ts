import { createSlice } from "@reduxjs/toolkit"
import { TicketType, TicketsType } from "../../utils/types"
import { RootState } from "../../app/store"
import {
  closeTicket,
  createTicket,
  getTicket,
  getTickets,
} from "./ticketThunks"

interface TicketState {
  tickets: TicketsType
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
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createTicket.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.tickets.push(payload)
      })
      .addCase(createTicket.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        state.message = payload as string
      })
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTickets.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.tickets = payload
      })
      .addCase(getTickets.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        state.message = payload as string
      })
      .addCase(getTicket.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTicket.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.ticket = payload
      })
      .addCase(getTicket.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        state.message = payload as string
      })
      .addCase(closeTicket.pending, (state) => {
        state.isLoading = true
      })
      .addCase(closeTicket.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.tickets.map((ticket) =>
          ticket._id === payload._id ? (ticket.status = "closed") : ticket
        )
      })
  },
})

export const selectTicket = (state: RootState) => state.tickets
export const { reset } = ticketSlice.actions
export default ticketSlice.reducer
