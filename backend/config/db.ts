import { connect, set } from "mongoose"

const connectDB = async () => {
  set("strictQuery", true)
  try {
    const conn = await connect(process.env.MONGO_URI as string)
    console.log(`MongoDB connected => ${conn.connection.host}`)
  } catch (err) {
    if (err instanceof Error) console.log(err.message)
    process.exit(1)
  }
}

export default connectDB
