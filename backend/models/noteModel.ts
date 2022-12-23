import { Schema, model } from "mongoose"

export interface NoteType {
  user: typeof Schema.Types.ObjectId
  ticket: typeof Schema.Types.ObjectId
  text: string
  isStaff: boolean
  staffId: string
}

const noteSchema = new Schema<NoteType>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    ticket: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Ticket",
    },
    text: {
      type: String,
      required: [true, "Please add some text"],
    },
    isStaff: {
      type: Boolean,
      default: false,
    },
    staffId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const Note = model<NoteType>("Note", noteSchema)

export default Note
