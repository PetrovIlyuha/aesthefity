import prisma from "../../lib/prisma"
import { validateRoute } from "../../lib/auth"

export default validateRoute(async (req, res, user) => {
  const songId = req.body
  const song = await prisma.song.findFirst({ where: { id: songId } })
  const favoriteRecord = await prisma.favorite.findFirst({
    where: { songId: song.id, userId: user.id },
  })
  await prisma.favorite.delete({ where: { id: favoriteRecord.id } })
  res.json({ ok: true })
})
