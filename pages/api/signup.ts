import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookie from "cookie"
import prisma from "../../lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"
import { APP_ACCESS_TOKEN } from "../../lib/auth"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const salt = bcrypt.genSaltSync()
  const { name, email, password } = req.body
  let user
  try {
    user = await prisma.user.create({
      data: {
        name,
        email,
        password: bcrypt.hashSync(password, salt),
      },
    })
    const token = jwt.sign(
      {
        email: user.email,
        id: user.id,
        time: Date.now(),
      },
      process.env.JWT_SECRET,
      { expiresIn: "48h" },
    )
    res.setHeader(
      "Set-Cookie",
      cookie.serialize(APP_ACCESS_TOKEN, token, {
        httlOnly: true,
        maxAge: 48 * 60 * 60,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      }),
    )
    delete user.password
    res.json(user)
  } catch (error) {
    res.status(401)
    res.json({ error: "User already exists" })
  }
}
