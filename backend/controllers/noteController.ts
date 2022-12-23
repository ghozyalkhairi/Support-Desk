import { RequestHandler } from "express"
import { ProtectReq } from "../middlewares/authMiddleware"
import asyncHandler from "express-async-handler"
import User from "../models/userModel"
import Ticket from "../models/ticketModel"
import Note from "../models/noteModel"

interface NoteReq extends ProtectReq {
  params: {
    ticketId?: string
  }
  body: {
    text: string
  }
}

const getNotes: RequestHandler = asyncHandler(async (req: NoteReq, res) => {
  // * Get user
  const user = await User.findById(req.user?.id)
  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  const ticket = await Ticket.findById(req.params.ticketId)
  if (ticket?.user.toString() !== req.user?.id) {
    res.status(401)
    throw new Error("User not authorized")
  }

  const notes = await Note.find({ ticket: req.params.ticketId })
  res.status(200).json(notes)
})

const createNote: RequestHandler = asyncHandler(async (req: NoteReq, res) => {
  const { text } = req.body
  if (!text) {
    res.status(400)
    throw new Error("Please add some text")
  }
  const user = await User.findById(req.user?.id)
  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }
  const ticket = await Ticket.findById(req.params.ticketId)
  if (ticket?.user.toString() !== req.user?.id) {
    res.status(401)
    throw new Error("User not authorized")
  }
  const note = await Note.create({
    user: req.user?.id,
    ticket: req.params.ticketId,
    text: req.body.text,
    isStaff: req.user?.isAdmin,
  })
  res.status(201).json(note)
})

export { getNotes, createNote }
