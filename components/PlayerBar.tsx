import { Box, Flex, Text } from "@chakra-ui/layout"
import { Img } from "@chakra-ui/react"
import { useStoreState } from "easy-peasy"
import Player from "./player"

const PlayerBar = () => {
  const activeSong = useStoreState((state: any) => state.activeSong)

  return (
    <Box height="100px" width="100vw" bg="gray.900" padding="10px">
      <Flex align="center">
        <Box padding="20px" color="white" width="30%">
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
        <Box width="40%">
          <Player />
        </Box>
      </Flex>
    </Box>
  )
}

export default PlayerBar
