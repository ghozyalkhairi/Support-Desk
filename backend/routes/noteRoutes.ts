import { Router } from "express"
import protect from "../middlewares/authMiddleware"
import { createNote, getNotes } from "../controllers/noteController"

const noteRouter = Router({
  mergeParams: true,
})

noteRouter.route("/").get(protect, getNotes).post(protect, createNote)

export default noteRouter
