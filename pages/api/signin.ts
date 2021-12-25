import cookie from "cookie"
import { NextApiRequest, NextApiResponse } from "next"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import prisma from "../../lib/prisma"
import { APP_ACCESS_TOKEN } from "../../lib/auth"

export default async function signIn(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { email, password } = req.body
  const user = await prisma.user.findUnique({
    where: { email },
  })
  if (user && bcrypt.compareSync(password, user.password)) {
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
  } else {
    res.status(401)
    res.json({ error: "Email or password is invalid!" })
  }
}
