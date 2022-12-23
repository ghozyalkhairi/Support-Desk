import axios, { AxiosRequestConfig } from "axios"
import { TicketType, TicketsType } from "../../utils/types"

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

export const getAllTickets = async (token: string) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  return response.data as TicketsType
}

export const getTicketById = async (tickedId: string, token: string) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + "/" + tickedId, config)
  return response.data as TicketType
}

export const closeTicketById = async (tickedId: string, token: string) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(
    API_URL + "/" + tickedId,
    { status: "closed" },
    config
  )
  return response.data as TicketType
}
