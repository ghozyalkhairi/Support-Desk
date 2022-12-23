import { createAsyncThunk } from "@reduxjs/toolkit"
import { TicketType, TicketsType } from "../../utils/types"
import { AxiosError } from "axios"
import {
  closeTicketById,
  createRequest,
  getAllTickets,
  getTicketById,
} from "./ticketService"
import { RootState } from "../../app/store"

//  * Create new ticket
export const createTicket = createAsyncThunk<
  TicketType,
  TicketType,
  { state: RootState }
>("tickets/create", async (ticketData: TicketType, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token
    const newTicket = await createRequest(ticketData, token as string)
    return newTicket as TicketType
  } catch (err) {
    const errorData =
      err instanceof Error
        ? (err as AxiosError).response?.data
        : "Failed to create ticket"
    const message = (errorData as any).message
    return thunkAPI.rejectWithValue(message)
  }
})
//  * Get user tickets
export const getTickets = createAsyncThunk<
  TicketsType,
  undefined,
  { state: RootState }
>("tickets/getAll", async (_?, thunkAPI?) => {
  try {
    const token = thunkAPI.getState().auth.user?.token
    const newTicket = await getAllTickets(token as string)
    return newTicket as TicketsType
  } catch (err) {
    const errorData =
      err instanceof Error
        ? (err as AxiosError).response?.data
        : "Failed to get tickets"
    const message = (errorData as any).message
    return thunkAPI.rejectWithValue(message)
  }
})
//  * Get a ticket
export const getTicket = createAsyncThunk<
  TicketType,
  string,
  { state: RootState }
>("tickets/get", async (ticketId, thunkAPI?) => {
  try {
    const token = thunkAPI.getState().auth.user?.token
    const ticket = await getTicketById(ticketId, token as string)
    return ticket as TicketType
  } catch (err) {
    const errorData =
      err instanceof Error
        ? (err as AxiosError).response?.data
        : "Failed to get tickets"
    const message = (errorData as any).message
    return thunkAPI.rejectWithValue(message)
  }
})
//  * Close a ticket
export const closeTicket = createAsyncThunk<
  TicketType,
  string,
  { state: RootState }
>("tickets/close", async (ticketId, thunkAPI?) => {
  try {
    const token = thunkAPI.getState().auth.user?.token
    const ticket = await closeTicketById(ticketId, token as string)
    return ticket as TicketType
  } catch (err) {
    const errorData =
      err instanceof Error
        ? (err as AxiosError).response?.data
        : "Failed to get tickets"
    const message = (errorData as any).message
    return thunkAPI.rejectWithValue(message)
  }
})
