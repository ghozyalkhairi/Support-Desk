import { Schema, model } from "mongoose"

interface TicketType {
  user: typeof Schema.Types.ObjectId
  product: string
  description: string
  status: string
}

const ticketSchema = new Schema<TicketType>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product: {
      type: String,
      required: [true, "Please select a product"],
      enum: ["iPhone", "Macbook Pro", "iMac", "iPad"],
    },
    description: {
      type: String,
      required: [true, "Please add a description of the issue"],
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "open", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
)

const Ticket = model<TicketType>("Ticket", ticketSchema)

export default Ticket
