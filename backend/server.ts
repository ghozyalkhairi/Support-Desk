import express from "express"
import path from "path"
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

app.use("/api/users", userRouter)
app.use("/api/tickets", ticketRouter)
app.use(errorHandler)

// * Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")))
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"))
  })
} else {
  app.get("/*", (req, res) => {
    res.status(200).json({
      message: "Welcome to Support Desk API",
    })
  })
}

app.listen(PORT, () => console.log("Server running at port: " + PORT))
