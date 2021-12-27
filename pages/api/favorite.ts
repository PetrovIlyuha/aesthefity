import { User } from "@prisma/client"
import prisma from "../../lib/prisma"
import { validateRoute } from "../../lib/auth"

export default validateRoute(async (req, res, user) => {
  const songId = req.body
  const song = await prisma.song.findUnique({ where: { id: songId } })
  await prisma.favorite.create({
    data: {
      songId: song.id,
      userId: user.id,
    },
  })
  res.json({ ok: true })
})
