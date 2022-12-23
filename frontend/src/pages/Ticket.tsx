import {
  FC,
  useEffect,
  useState,
  MouseEventHandler,
  FormEventHandler,
} from "react"
import { useAppDispatch, useAppSelector } from "../app/hook"
import { reset, selectTicket } from "../features/tickets/ticketSlice"
import { reset as noteReset, selectNote } from "../features/notes/noteSlice"
import { createNote, getNotes } from "../features/notes/noteThunks"
import { getTicket, closeTicket } from "../features/tickets/ticketThunks"
import { Params, useParams, useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"
import BackButton from "../components/BackButton"
import Modal from "react-modal"
import { toast } from "react-toastify"
import NoteItem from "../components/NoteItem"
import { FaPlus } from "react-icons/fa"

interface TicketParams extends Readonly<Params<string>> {
  ticketId?: string
}

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
}

Modal.setAppElement("#root")

const Ticket: FC = () => {
  const params: TicketParams = useParams()
  const [modalOpen, setModalOpen] = useState(false)
  const [noteText, setNoteText] = useState("")
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { ticket, isLoading, isSuccess, isError, message } =
    useAppSelector(selectTicket)
  const { notes, isLoading: notesIsLoading } = useAppSelector(selectNote)
  const openModal: MouseEventHandler<HTMLButtonElement> = () => {
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }
  const onCloseTicket: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(closeTicket(params.ticketId as string))
    toast.success("Ticket closed", { position: "top-center" })
    navigate("/tickets")
  }
  const onNoteSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const noteData = {
      text: noteText,
      ticketId: params.ticketId as string,
    }
    dispatch(createNote(noteData))
    closeModal()
  }
  useEffect(() => {
    dispatch(getTicket(params.ticketId as string))
    dispatch(getNotes(params.ticketId as string))
    if (isError) {
      toast.error(message)
      dispatch(reset())
    }
    return () => {
      if (isSuccess) {
        dispatch(reset())
        dispatch(noteReset())
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])
  if (isLoading || notesIsLoading) return <Spinner />
  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticket?._id}{" "}
          <span className={`status status-${ticket?.status}`}>
            {ticket?.status}
          </span>
        </h2>
        <h3>
          Date Submitted:{" "}
          {new Date(ticket?.createdAt as string).toLocaleString("en-US")}
        </h3>
        <h3>Product: {ticket?.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket?.description}</p>
        </div>
        <h2>Notes</h2>
      </header>
      {ticket?.status === "new" ? (
        <button onClick={openModal} className="btn">
          <FaPlus />
          Add Note
        </button>
      ) : null}
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={customStyles as Modal.Styles}
        contentLabel="Add Note"
      >
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="Note Text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>
      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}
      {ticket?.status === "new" ? (
        <button onClick={onCloseTicket} className="btn btn-block btn-danger">
          Close
        </button>
      ) : null}
    </div>
  )
}

export default Ticket
