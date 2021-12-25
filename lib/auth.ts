import { NextApiResponse } from "next"
import { NextApiRequest } from "next"
import jwt, { JwtPayload } from "jsonwebtoken"
import prisma from "./prisma"

export const APP_ACCESS_TOKEN = "APP_ACCESS_TOKEN"

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { APP_ACCESS_TOKEN: token } = req.cookies
    if (token) {
      let user
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload
        user = await prisma.user.findUnique({ where: { id: decoded.id } })
        if (!user) {
          throw new Error("User was not found! Access Restricted.")
        }
      } catch (error) {
        res.status(401)
        res.json({ error: "Not Authenticated" })
        return
      }
      delete user.password
      return handler(req, res, user)
    }
    res.status(401)
    res.json({ error: "Not Authenticated" })
    return
  }
}

export const validateUserToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET) as JwtPayload
}
