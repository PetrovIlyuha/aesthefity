import { Skeleton } from "@chakra-ui/react"
import { Box, Text } from "@chakra-ui/layout"
import MainPageLayout from "../../components/mainPageLayout"
import SongTable from "../../components/SongTable"

import { validateUserToken } from "../../lib/auth"
import { getImageByQuery } from "../../lib/imageGetter"
import prisma from "../../lib/prisma"

const Playlist = ({ playlist }) => {
  const getBgColor = (id) => {
    const colors = [
      "red",
      "green",
      "blue",
      "orange",
      "purple",
      "gray",
      "teal",
      "yellow",
    ]
    return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)]
  }

  if (!playlist) {
    return (
      <Box>
        <Skeleton>
          <Text fontSize="2xl">Loading</Text>
        </Skeleton>
      </Box>
    )
  }
  return (
    <MainPageLayout
      color={getBgColor(playlist.id)}
      roundedImage={false}
      title={playlist.name}
      subtitle="Playlist"
      descriptionDetails={`${playlist?.songs.length} songs in the playlist`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <SongTable songs={playlist.songs} />
    </MainPageLayout>
  )
}

export async function getServerSideProps({ params, req }) {
  let user

  try {
    user = validateUserToken(req.cookies.APP_ACCESS_TOKEN)
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    }
  }

  const [playlist] = await prisma.playList.findMany({
    where: {
      userId: user.id,
      id: +params.id,
    },
    include: {
      songs: {
        include: {
          artist: true,
        },
      },
    },
  })
  let images = await getImageByQuery("playful")
  let songsImages
  if (playlist) {
    songsImages = playlist.songs.map((song) => {
      const randomizer = Math.floor(Math.random() * 10)
      return {
        ...song,
        image: images[randomizer].urls.regular,
      }
    })
  }
  const playListWithSongsImages = { ...playlist, songs: songsImages }
  return {
    props: {
      playlist: playListWithSongsImages,
    },
  }
}

export default Playlist
