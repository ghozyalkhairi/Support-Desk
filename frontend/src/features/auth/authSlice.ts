import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { UserType } from "../../utils/types"
import { register, login, logout } from "./authThunks"

interface AuthState {
  user: UserType | null
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  message: string
}

const user: UserType = JSON.parse(localStorage.getItem("user") as string)

const initialState: AuthState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = payload
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.isLoading = false
        state.user = null
        state.isError = true
        state.message = payload as string
      })
      .addCase(login.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = payload
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false
        state.user = null
        state.isError = true
        state.message = payload as string
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.user = payload
      })
  },
})

export const selectAuth = (state: RootState) => state.auth
export const { reset } = authSlice.actions
export default authSlice.reducer
