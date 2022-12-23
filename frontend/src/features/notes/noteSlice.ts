import { createSlice } from "@reduxjs/toolkit"
import { NoteType, NotesType } from "../../utils/types"
import { RootState } from "../../app/store"
import { createNote, getNotes } from "./noteThunks"

interface NoteState {
  notes: NotesType
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  message: string
}

const initialState: NoteState = {
  notes: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
}

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getNotes.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.notes = payload
      })
      .addCase(getNotes.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        state.message = payload as string
      })
      .addCase(createNote.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createNote.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.notes.push(payload)
      })
      .addCase(createNote.rejected, (state, { payload }) => {
        state.isLoading = false
        state.isError = true
        state.message = payload as string
      })
  },
})

export const selectNote = (state: RootState) => state.notes
export const { reset } = noteSlice.actions
export default noteSlice.reducer
