import { Skeleton } from "@chakra-ui/react"
import { Box, Text } from "@chakra-ui/layout"
import MainPageLayout from "../../components/mainPageLayout"
import SongTable from "../../components/SongTable"

import { validateUserToken } from "../../lib/auth"
import { getImageByQuery } from "../../lib/imageGetter"
import prisma from "../../lib/prisma"

const Playlist = ({ artist }) => {
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

  if (!artist) {
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
      color={getBgColor(artist.id)}
      roundedImage={false}
      title={artist.name}
      subtitle="Playlist"
      descriptionDetails={`${artist?.songs.length} songs in the playlist`}
      image={`https://picsum.photos/400?random=${artist.id}`}
    >
      <SongTable songs={artist.songs} />
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

  const artist = await prisma.artist.findUnique({
    where: {
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
  if (artist) {
    const randomizer = Math.floor(Math.random() * 10)
    songsImages = artist.songs.map((song) => ({
      ...song,
      image: images[randomizer].urls.regular,
    }))
  }
  const artistWithSongImages = { ...artist, songs: songsImages }
  return {
    props: {
      artist: artistWithSongImages,
    },
  }
}

export default Playlist
