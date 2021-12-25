import { Box, Flex, Text } from "@chakra-ui/layout"
import {
  Table,
  Thead,
  Td,
  Tr,
  Tbody,
  Th,
  IconButton,
  Img,
} from "@chakra-ui/react"
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs"
import { AiOutlineClockCircle } from "react-icons/ai"
import { formatDistanceToNow } from "date-fns"
import { useStoreActions, useStoreState } from "easy-peasy"
import { humanReadableTime } from "../lib/misc"

const SongTable = ({ songs }) => {
  const setActiveSong = useStoreActions(
    (actions: any) => actions.changeActiveSong,
  )
  const setActiveSongs = useStoreActions(
    (actions: any) => actions.changeActiveSongs,
  )
  const togglePlay = useStoreActions(
    (actions: any) => actions.togglePlayingState,
  )
  const songIsPlaying = useStoreState((state: any) => state.songPlaying)
  const currentActiveSong = useStoreState((state: any) => state.activeSong)

  const handlePlaySelectedSong = (song) => {
    togglePlay(false)
    setActiveSong(song)
    setActiveSongs(songs)
    if (currentActiveSong !== song) {
      setTimeout(() => {
        togglePlay(true)
      }, 100)
    }
  }

  const handleMainPlay = () => {
    if (!currentActiveSong) {
      setActiveSong(songs[0])
      setActiveSongs(songs)
      togglePlay(true)
    }
    if (songIsPlaying) {
      togglePlay(false)
    } else {
      togglePlay(true)
    }
  }

  return (
    <Box bg="transparent" color="white">
      <Box padding="35px" marginTop="-2.4rem">
        <Box paddingLeft="0.4rem" marginBottom="20px">
          <IconButton
            icon={
              songIsPlaying ? (
                <BsFillPauseFill fontSize="30px" />
              ) : (
                <BsFillPlayFill fontSize="30px" />
              )
            }
            colorScheme="green"
            size="lg"
            isRound
            aria-label="play"
            onClick={() => handleMainPlay()}
          />
        </Box>
        <Table variant="unstyled">
          <Thead borderBottom="1px solid" borderColor="rgba(255,255,255,0.3)">
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Date Added</Th>
              <Th>
                <AiOutlineClockCircle />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {songs.map((song, index) => (
              <Tr
                onClick={() => handlePlaySelectedSong(song)}
                sx={{ transition: "all 0.3s ease-in" }}
                className={
                  currentActiveSong?.name === song.name && "highlightActiveSong"
                }
                _hover={{ bg: "rgba(255,255,255,0.1)" }}
                key={song.id}
                cursor="pointer"
              >
                <Td>{index + 1}</Td>
                <Td>
                  <Flex align="center" width="50%" justify="space-between">
                    <Text>{song.name}</Text>
                    <Img src={song.image} height="22px" width="22px" />
                  </Flex>
                </Td>
                <Td>{formatDistanceToNow(song.createdAt)} ago</Td>
                <Td>{humanReadableTime(song.duration)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}

export default SongTable
