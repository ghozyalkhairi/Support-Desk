import axios from "axios"
import { UserType } from "../../utils/types"

const API_URL = "http://localhost:7000/api/users"

// * Register user
export const registerRequest = async (userData: UserType) => {
  const resp = await axios.post(API_URL, userData)
  if (resp.data) {
    localStorage.setItem("user", JSON.stringify(resp.data))
    console.log(resp.data)
  }
  return resp.data as UserType
}

export const loginRequest = async (userData: UserType) => {
  const resp = await axios.post(API_URL + "/login", userData)
  if (resp.data) {
    localStorage.setItem("user", JSON.stringify(resp.data))
    console.log(resp.data)
  }
  return resp.data as UserType
}

export const logoutRequest = () => localStorage.removeItem("user")
