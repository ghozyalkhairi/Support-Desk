import { createAsyncThunk } from "@reduxjs/toolkit"
import { registerRequest, loginRequest, logoutRequest } from "./authService"
import { AxiosError } from "axios"
import { UserType } from "../../utils/types"

export const register = createAsyncThunk(
  "auth/register",
  async (user: UserType, thunkAPI) => {
    try {
      const userRegister = await registerRequest(user)
      return userRegister as UserType
    } catch (err) {
      const errorData =
        err instanceof Error
          ? (err as AxiosError).response?.data
          : "Failed to register"
      const message = (errorData as any).message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const login = createAsyncThunk(
  "auth/login",
  async (user: UserType, thunkAPI) => {
    try {
      const userRegister = await loginRequest(user)
      return userRegister as UserType
    } catch (err) {
      const errorData =
        err instanceof Error
          ? (err as AxiosError).response?.data
          : "Failed to register"
      const message = (errorData as any).message
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const logout = createAsyncThunk("auth/logout", async () => {
  logoutRequest()
  return null
})
