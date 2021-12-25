import { NextApiResponse } from "next"
import { NextApiRequest } from "next"
import prisma from "../../lib/prisma"
import { validateRoute } from "./../../lib/auth"

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user: any) => {
    const usersPlaylists = await prisma.playList.count({
      where: {
        userId: user.id,
      },
    })
    res.json({ ...user, usersPlaylists })
  },
)
