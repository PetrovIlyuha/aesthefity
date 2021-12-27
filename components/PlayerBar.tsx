import { Box, Flex, Text } from "@chakra-ui/layout"
import { Img } from "@chakra-ui/react"
import { useStoreState } from "easy-peasy"
import { useEffect, useState } from "react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { favoriteSong, isInFavorites, unfavoriteSong } from "../lib/favorites"
import { throttle } from "../lib/misc"
import Player from "./player"

const PlayerBar = () => {
  const activeSong = useStoreState((state: any) => state.activeSong)
  const [isFavorited, setIsFavorited] = useState(false)
  const [likeAnimation, setLikeAnimation] = useState(false)

  const toggleLikeSong = async () => {
    if (activeSong) {
      setLikeAnimation(true)
      if (isFavorited) {
        await unfavoriteSong(activeSong.id)
        await checkInFavorites()
      } else {
        await favoriteSong(activeSong.id)
        await checkInFavorites()
      }
      setLikeAnimation(false)
    }
  }

  const toggleLikeThrottled = throttle(toggleLikeSong, 500)

  const checkInFavorites = async () => {
    if (activeSong) {
      const response = await isInFavorites(activeSong.id)
      if (response.ok) {
        setIsFavorited(true)
      } else {
        setIsFavorited(false)
      }
    }
  }

  useEffect(() => {
    checkInFavorites()
  }, [activeSong])

  return (
    <Box height="100px" width="100vw" bg="gray.900" padding="10px">
      <Flex align="center">
        <Box padding="20px" color="white" width="20%">
          <Flex align="center">
            {activeSong?.image && (
              <Img
                src={activeSong?.image}
                height="40px"
                width="40px"
                marginRight="1rem"
              />
            )}
            <Box>
              <Text fontSize="large">{activeSong?.name || "Song Name"}</Text>
              <Text fontSize="sm">
                {activeSong?.artist?.name || "Artist Name"}
              </Text>
            </Box>
          </Flex>
        </Box>
        <Box width="10%" marginTop="1.2rem">
          {isFavorited ? (
            <AiFillHeart
              size="2.3rem"
              onClick={toggleLikeThrottled}
              className={`animate__animated ${
                likeAnimation && "animate__tada"
              }`}
              color="#5dba23"
            />
          ) : (
            <AiOutlineHeart
              className={`animate__animated ${
                likeAnimation && "animate__tada"
              }`}
              size="2.3rem"
              onClick={toggleLikeThrottled}
            />
          )}
        </Box>
        <Box width="40%">
          <Player />
        </Box>
      </Flex>
    </Box>
  )
}

export default PlayerBar
