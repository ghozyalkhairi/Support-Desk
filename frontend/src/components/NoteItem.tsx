import { FC } from "react"
import { useAppSelector } from "../app/hook"
import { selectAuth } from "../features/auth/authSlice"
import { NoteType } from "../utils/types"

interface Props {
  note: NoteType
}

const NoteItem: FC<Props> = ({ note }) => {
  const { user } = useAppSelector(selectAuth)
  return (
    <div
      className="note"
      style={{
        backgroundColor: note.isStaff ? "rgba(0,0,0,0.7)" : "#FFF",
        color: note.isStaff ? "#FFF)" : "#000",
      }}
    >
      <h4>
        Note from{" "}
        {note.isStaff ? <span>Staff</span> : <span>{user?.name}</span>}
      </h4>
      <p>{note.text}</p>
      <div className="note-date">
        {new Date(note.createdAt as string).toLocaleString("en-US")}
      </div>
    </div>
  )
}

export default NoteItem
