import { RequestHandler } from "express"
import { ProtectReq } from "../middlewares/authMiddleware"
import asyncHandler from "express-async-handler"
import User from "../models/userModel"
import Ticket from "../models/ticketModel"

const getTickets: RequestHandler = asyncHandler(
  async (req: ProtectReq, res) => {
    // * Get user
    const user = await User.findById(req.user?.id)
    if (!user) {
      res.status(401)
      throw new Error("User not found")
    }

    const tickets = await Ticket.find({
      user: req.user?.id,
    })
    res.status(200).json(tickets)
  }
)

const getTicket: RequestHandler = asyncHandler(async (req: ProtectReq, res) => {
  // * Get user
  const user = await User.findById(req.user?.id)
  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  const ticket = await Ticket.findById(req.params.id)
  if (!ticket) {
    res.status(404)
    throw new Error("Ticket not found")
  }
  if (ticket.user.toString() !== req.user?.id) {
    res.send(401)
    throw new Error("Not authorized")
  }

  res.status(200).json(ticket)
})

interface TicketReq extends ProtectReq {
  body: {
    product: string
    description: string
  }
}

const createTickets: RequestHandler = asyncHandler(
  async (req: TicketReq, res) => {
    const { product, description } = req.body
    if (!product || !description) {
      res.status(400)
      throw new Error("Please add a product and description")
    }
    const user = await User.findById(req.user?.id)
    if (!user) {
      res.status(401)
      throw new Error("User not found")
    }
    const ticket = await Ticket.create({
      product,
      description,
      user: req.user?.id,
      status: "new",
    })
    res.status(201).json(ticket)
  }
)

const deleteTicket: RequestHandler = asyncHandler(
  async (req: ProtectReq, res) => {
    // * Get user
    const user = await User.findById(req.user?.id)
    if (!user) {
      res.status(401)
      throw new Error("User not found")
    }

    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
      res.status(404)
      throw new Error("Ticket not found")
    }
    if (ticket.user.toString() !== req.user?.id) {
      res.send(401)
      throw new Error("Not authorized")
    }

    await ticket.remove()

    res.status(200).json({
      success: true,
    })
  }
)

const updateTicket: RequestHandler = asyncHandler(
  async (req: ProtectReq, res) => {
    // * Get user
    const user = await User.findById(req.user?.id)
    if (!user) {
      res.status(401)
      throw new Error("User not found")
    }

    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
      res.status(404)
      throw new Error("Ticket not found")
    }
    if (ticket.user.toString() !== req.user?.id) {
      res.send(401)
      throw new Error("Not authorized")
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    )

    res.status(200).json(updatedTicket)
  }
)

export { getTickets, getTicket, createTickets, deleteTicket, updateTicket }
