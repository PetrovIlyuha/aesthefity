import { User } from "@prisma/client"
import prisma from "../../lib/prisma"
import { validateRoute } from "../../lib/auth"

export default validateRoute(async (req, res, user) => {
  const songId = req.body
  const actualSong = await prisma.song.findUnique({ where: { id: songId } })
  const favorited = await prisma.favorite.findFirst({
    where: { songId: actualSong.id, userId: user.id },
  })
  if (favorited) {
    res.json({ ok: true })
  } else {
    res.json({ ok: false })
  }
})
