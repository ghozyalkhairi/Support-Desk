import { Schema, model } from "mongoose"

export interface UserType {
  name: string
  email: string
  password: string
  isAdmin?: boolean
  id?: string
}

const userSchema = new Schema<UserType>(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const User = model<UserType>("User", userSchema)

export default User
