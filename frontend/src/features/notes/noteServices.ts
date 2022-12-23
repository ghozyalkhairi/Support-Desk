import axios, { AxiosRequestConfig } from "axios"
import { NoteData } from "./noteThunks"
import { NoteType, NotesType } from "../../utils/types"

const API_URL = "http://localhost:7000/api/tickets/"

// * Get all notes
export const getAllNotes = async (ticketId: string, token: string) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + "/" + ticketId + "/notes", config)
  return response.data as NotesType
}

export const create = async (noteData: NoteData, token: string) => {
  const { ticketId, text } = noteData
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(
    API_URL + "/" + ticketId + "/notes",
    { text },
    config
  )
  return response.data as NoteType
}
