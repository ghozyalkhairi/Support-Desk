import express from "express"
import { registerUser, loginUser, getMe } from "../controllers/userController"
import protect from "../middlewares/authMiddleware"

const userRouter = express.Router()

userRouter.post("/", registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/me", protect, getMe)

export default userRouter
