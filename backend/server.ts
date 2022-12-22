import express from "express"
import { config } from "dotenv"
import connectDB from "./config/db"
import colors from "colors"
import cors from "cors"
import errorHandler from "./middlewares/errorMiddleware"
import userRouter from "./routes/userRoutes"
import ticketRouter from "./routes/ticketRoutes"

config()
const PORT = process.env.PORT || 9000
connectDB()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello from express.",
  })
})

app.use("/api/users", userRouter)
app.use("/api/tickets", ticketRouter)
app.use(errorHandler)

app.get("/*", (req, res) => {
  res.status(404).json({
    message: "Not found.",
  })
})

app.listen(PORT, () => console.log("Server running at port: " + PORT))
