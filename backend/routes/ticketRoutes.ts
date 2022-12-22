import express from "express"
import protect from "../middlewares/authMiddleware"
import {
  createTickets,
  getTickets,
  getTicket,
  deleteTicket,
  updateTicket,
} from "../controllers/ticketController"

const ticketRouter = express.Router()

ticketRouter.route("/").get(protect, getTickets).post(protect, createTickets)
ticketRouter
  .route("/:id")
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket)

export default ticketRouter
