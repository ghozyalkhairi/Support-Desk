import { RequestHandler } from "express"
import asyncHandler from "express-async-handler"
import jwt, { Secret } from "jsonwebtoken"
import { ObjectId } from "bson"
import bcrypt from "bcryptjs"
import User from "../models/userModel"
import { ProtectReq } from "../middlewares/authMiddleware"

interface RegisterField {
  name: string
  email: string
  password: string
}

const generateToken = (id: ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as Secret, {
    expiresIn: "7d",
  })
}

const registerUser: RequestHandler = asyncHandler(async (req, res) => {
  const { body } = req as { body: RegisterField }
  const { name, email, password } = body
  if (!name || !email || !password) {
    res.status(400)
    throw new Error("Please include all fields")
  }
  const userExists = await User.findOne({
    email,
  })
  if (userExists) {
    res.status(400)
    throw new Error("User already exists")
  }
  // * Hash password
  const salt = await bcrypt.genSalt(10)
  const hashpassword = await bcrypt.hash(password, salt)
  // * Create user
  const user = await User.create({
    name,
    email,
    password: hashpassword,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
    return
  }
  res.status(400)
  throw new Error("Invalid user data")
})

interface LoginField {
  email: string
  password: string
}

const loginUser: RequestHandler = asyncHandler(async (req, res) => {
  const { body } = req as { body: LoginField }
  const { email, password } = body
  if (!email || !password) {
    res.status(400)
    throw new Error("Please include all fields")
  }
  const user = await User.findOne({
    email,
  })
  // * Check user and password match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
    return
  }
  res.status(401)
  throw new Error("Invalid credentials")
})

const getMe: RequestHandler = asyncHandler(async (req: ProtectReq, res) => {
  const user = {
    id: req.user?.id,
    email: req.user?.email,
    name: req.user?.name,
  }
  res.status(200).json({
    user,
  })
})

export { registerUser, loginUser, getMe }
