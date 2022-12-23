import { Request, RequestHandler } from "express"
import jwt, { Secret } from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "../models/userModel"
import { UserType } from "../models/userModel"
import { ObjectId } from "bson"

interface Decoded extends jwt.JwtPayload {
  id: ObjectId
}

export interface ProtectReq extends Request {
  user?: UserType
}

const protect: RequestHandler = asyncHandler(
  async (req: ProtectReq, res, next) => {
    const user = {
      token: "",
    }

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        // * Get token from headers
        user.token = req.headers.authorization.split(" ")[1]
        // * Verify token
        const decoded = jwt.verify(
          user.token,
          process.env.JWT_SECRET as Secret
        ) as Decoded
        // * Get user from token
        req.user = (await User.findById(decoded.id).select(
          "-password"
        )) as UserType
        next()
      } catch (err) {
        if (err instanceof Error) console.log(err.message)
        res.status(401)
        throw new Error("Not authorized")
      }
    }

    if (!user.token) {
      res.status(401)
      throw new Error("Not authorized")
    }
  }
)

export default protect
