import { createAsyncThunk } from "@reduxjs/toolkit"
import { TicketType } from "../../utils/types"
import { AxiosError } from "axios"
import { createRequest } from "./ticketService"
import { RootState } from "../../app/store"

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
