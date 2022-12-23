import { FC, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../app/hook"
import { selectTicket, reset } from "../features/tickets/ticketSlice"
import { getTickets } from "../features/tickets/ticketThunks"
import TicketItem from "../components/TicketItem"
import Spinner from "../components/Spinner"
import BackButton from "../components/BackButton"

const Tickets: FC = () => {
  const dispatch = useAppDispatch()
  const { tickets, isLoading, isSuccess } = useAppSelector(selectTicket)
  useEffect(() => {
    dispatch(getTickets())
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])
  if (isLoading) return <Spinner />
  return (
    <>
      <BackButton url="/" />
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  )
}

export default Tickets
