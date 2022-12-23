import { FC } from "react"
import { Link } from "react-router-dom"
import { TicketType } from "../utils/types"

interface Props {
  ticket: TicketType
}

const TicketItem: FC<Props> = ({ ticket }) => {
  return (
    <div className="ticket">
      <div>{new Date(ticket.createdAt as string).toLocaleString("en-us")}</div>
      <div>{ticket.product}</div>
      <div className={`status status-${ticket.status}`}>{ticket.status}</div>
      <Link to={`/ticket/${ticket._id}`} className="btn btn-reverse btn-sm">
        View
      </Link>
    </div>
  )
}

export default TicketItem
