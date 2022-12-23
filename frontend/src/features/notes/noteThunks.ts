import { AxiosError } from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { NoteType, NotesType } from "../../utils/types"
import { RootState } from "../../app/store"
import { create, getAllNotes } from "./noteServices"

//  * Get notes
export const getNotes = createAsyncThunk<
  NotesType,
  string,
  { state: RootState }
>("notes/getAll", async (ticketId, thunkAPI?) => {
  try {
    const token = thunkAPI.getState().auth.user?.token
    const ticket = await getAllNotes(ticketId, token as string)
    return ticket as NotesType
  } catch (err) {
    const errorData =
      err instanceof Error
        ? (err as AxiosError).response?.data
        : "Failed to get tickets"
    const message = (errorData as any).message
    return thunkAPI.rejectWithValue(message)
  }
})

//  * Create note
export interface NoteData {
  text: string
  ticketId: string
}
export const createNote = createAsyncThunk<
  NoteType,
  NoteData,
  { state: RootState }
>("notes/create", async (noteData, thunkAPI?) => {
  try {
    const token = thunkAPI.getState().auth.user?.token
    const ticket = await create(noteData, token as string)
    return ticket as NoteType
  } catch (err) {
    const errorData =
      err instanceof Error
        ? (err as AxiosError).response?.data
        : "Failed to get tickets"
    const message = (errorData as any).message
    return thunkAPI.rejectWithValue(message)
  }
})
