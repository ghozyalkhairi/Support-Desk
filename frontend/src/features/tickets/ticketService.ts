import axios, { AxiosRequestConfig } from "axios"
import { TicketType } from "../../utils/types"

const API_URL = "http://localhost:7000/api/tickets"

export const createRequest = async (ticketData: TicketType, token: string) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, ticketData, config)
  return response.data as TicketType
}
