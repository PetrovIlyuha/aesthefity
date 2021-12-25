import MainPageLayout from "../components/mainPageLayout"
import { useEffect } from "react"
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/layout"
import prisma from "../lib/prisma"
import { useCurrentUser } from "../lib/hooks"
import { Img, SkeletonCircle, SkeletonText } from "@chakra-ui/react"
import { getImageByQuery } from "../lib/imageGetter"
import { useStoreActions } from "easy-peasy"
import Link from "next/link"

export default function Home({ artists }) {
  const mainColor = "green"
  const { user, isLoading } = useCurrentUser()
  const togglePlay = useStoreActions((state: any) => state.togglePlayingState)

  useEffect(() => {
    togglePlay(false)
  }, [])
  if (isLoading || !artists) {
    return (
      <Box
        bgGradient={`linear(${mainColor}.500 0%, ${mainColor}.600 7%, ${mainColor}.700 18%, rgba(0,0,0,0.95) 75%)`}
        height="calc(100vh - 100px)"
      >
        <Box padding="5rem">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </Box>
        <Box color="whatsapp.200" paddingX="40px">
          <Box marginBottom="40px">
            <Text fontSize="2xl" fontWeight="bold">
              Top artists this month
            </Text>
            <Text fontSize="md">only visible to you</Text>
          </Box>
          <SimpleGrid
            mt="20"
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            spacingX="12"
            spacingY="16"
          >
            {Array.from({ length: 10 })
              .map((el) => ({
                name: "Artist",
              }))
              .map((artist, index) => (
                <Flex
                  key={index}
                  bgGradient={`linear(${mainColor}.500 0%, ${mainColor}.600 10%, ${mainColor}.700 55%, rgba(0,0,0,0.95) 100%)`}
                  rounded="2xl"
                  boxShadow={`4px 4px 22px -9px ${mainColor}`}
                  direction="column"
                  align="center"
                  textAlign="center"
                  transition="all 0.2s ease-in"
                  _hover={{ transform: "translateY(-3px)" }}
                >
                  <SkeletonCircle
                    size="40"
                    marginTop="1rem"
                    rounded="full"
                    objectFit="cover"
                  />
                  <Box alignSelf="flex-start" paddingX="1.5rem" my="4">
                    <Text fontWeight="bold" fontSize="lg">
                      {artist.name}
                    </Text>
                  </Box>
                </Flex>
              ))}
          </SimpleGrid>
        </Box>
      </Box>
    )
  }
  return (
    <MainPageLayout
      color={mainColor}
      subtitle="profile"
      title={user.name}
      descriptionDetails={`${user.usersPlaylists} public playlists`}
      image="https://images.generated.photos/M92xxhD5pHmh96-l1Q8N7_XqM4x1HqftNr9JMiBF9RY/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NDUxOTI2LmpwZw.jpg"
      roundedImage
    >
      <Box color="whatsapp.200" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artists this month
          </Text>
          <Text fontSize="md">only visible to you</Text>
        </Box>
        <SimpleGrid
          mt="20"
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacingX="12"
          spacingY="16"
        >
          {artists.map((artist) => (
            <Link href={`/artist/${artist.id}`}>
              <Flex
                cursor="pointer"
                key={artist.name}
                bgGradient={`linear(${mainColor}.500 0%, ${mainColor}.600 10%, ${mainColor}.700 55%, rgba(0,0,0,0.95) 100%)`}
                rounded="2xl"
                boxShadow={`4px 4px 22px -9px ${mainColor}`}
                direction="column"
                align="center"
                textAlign="center"
                transition="all 0.2s ease-in"
                _hover={{ transform: "translateY(-3px)" }}
              >
                <Img
                  alt={artist.name}
                  w="40"
                  h="40"
                  marginTop="1rem"
                  rounded="full"
                  objectFit="cover"
                  src={artist.image}
                />
                <Box alignSelf="flex-start" paddingX="1.5rem" my="4">
                  <Text fontWeight="bold" fontSize="lg">
                    {artist.name}
                  </Text>
                </Box>
              </Flex>
            </Link>
          ))}
        </SimpleGrid>
      </Box>
    </MainPageLayout>
  )
}

export async function getServerSideProps(ctx) {
  const artists = await prisma.artist.findMany({
    include: { songs: true },
  })
  let artistsWithImages = []
  let images = await getImageByQuery("colorful")
  if (artists.length) {
    for (let i = 0; i < artists.length; i++) {
      const randomizer = Math.floor(Math.random() * 10)
      artistsWithImages[i] = {
        ...artists[i],
        image: images[randomizer].urls.regular,
      }
    }
  }
  return {
    props: {
      artists: artistsWithImages,
    },
  }
}
