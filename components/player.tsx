import {
  Box,
  ButtonGroup,
  Center,
  IconButton,
  Flex,
  Text,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react"
import { useStoreActions, useStoreState } from "easy-peasy"
import { useEffect, useRef, useState } from "react"
import ReactHowler from "react-howler"
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from "react-icons/md"
import { humanReadableTime } from "../lib/misc"

const Player = () => {
  const activeSong = useStoreState((state: any) => state.activeSong)
  const activeSongList = useStoreState((state: any) => state.activeSongs)
  const togglePlay = useStoreActions(
    (actions: any) => actions.togglePlayingState,
  )
  const changeActiveSong = useStoreActions(
    (actions: any) => actions.changeActiveSong,
  )
  const songIsPlaying = useStoreState((state: any) => state.songPlaying)

  const [playing, setPlaying] = useState(false)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [seek, setSeek] = useState(0.0)
  const [repeat, setRepeat] = useState(false)
  const [isSeeking, setIsSeeking] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [duration, setDuration] = useState(0.0)
  const soundRef = useRef(null)
  const repeatRef = useRef(repeat)

  useEffect(() => {
    repeatRef.current = repeat
  }, [repeat])

  useEffect(() => {
    if (activeSong) {
      const actualIndex = activeSongList.findIndex(
        (song) => song.id === activeSong.id,
      )
      setCurrentSongIndex(actualIndex)
      if (songIsPlaying) {
        setPlaying(true)
      }
    }
  }, [activeSong, songIsPlaying])

  useEffect(() => {
    songIsPlaying ? setPlaying(true) : setPlaying(false)
  }, [songIsPlaying])

  useEffect(() => {
    if (activeSong) {
      const actualSong = activeSongList.find(
        (el, idx) => idx == currentSongIndex,
      )
      changeActiveSong(actualSong)
      setPlaying(true)
      togglePlay(true)
    }
  }, [currentSongIndex])

  useEffect(() => {
    if (soundRef.current) {
      let timerId
      if (playing && !isSeeking) {
        const animate = () => {
          setSeek(soundRef.current.seek())
          timerId = requestAnimationFrame(animate)
        }

        timerId = requestAnimationFrame(animate)
        return () => {
          cancelAnimationFrame(timerId)
        }
      }
    }
  }, [playing, isSeeking])

  const toggleSongPlayedInPlayer = () => {
    if (playing) {
      setPlaying(false)
      togglePlay(false)
    } else {
      setPlaying(true)
      togglePlay(true)
    }
  }

  const setPrevSong = () => {
    // @ts-ignore
    setCurrentSongIndex((state) => {
      if (shuffle) {
        const next = Math.floor(Math.random() * activeSongList.length)
        if (next === state) {
          return setPrevSong()
        }
        return next
      }
      return state ? state - 1 : activeSongList.length - 1
    })
  }

  const setNextSong = () => {
    // @ts-ignore
    setCurrentSongIndex((state) => {
      if (shuffle) {
        const next = Math.floor(Math.random() * activeSongList.length)
        if (next === state) {
          return setNextSong()
        }
        return next
      }
      return state === activeSongList.length - 1 ? 0 : state + 1
    })
  }

  const onSongEnded = () => {
    if (repeatRef.current) {
      setSeek(0)
      soundRef.current.seek(0)
    } else {
      setNextSong()
    }
  }

  const onLoad = () => {
    const songDuration = soundRef.current.duration()
    setDuration(songDuration)
  }

  const onSeek = (e) => {
    setSeek(parseFloat(e[0]))
    soundRef.current.seek(e[0])
  }

  return (
    <Box>
      <Box>
        {activeSong && (
          <ReactHowler
            ref={soundRef}
            playing={playing}
            src={activeSong?.url}
            onLoad={onLoad}
            onEnd={onSongEnded}
          />
        )}
      </Box>
      <Center>
        <ButtonGroup>
          <IconButton
            outline="none"
            variant="link"
            aria-label="shuffle"
            fontSize="24px"
            onClick={() => setShuffle((shuffle) => !shuffle)}
          >
            <MdShuffle color={`${shuffle ? "#418220" : "#1e4d66"}`} />
          </IconButton>
          <IconButton
            outline="none"
            variant="link"
            aria-label="shuffle"
            fontSize="24px"
            onClick={setPrevSong}
          >
            <MdSkipPrevious />
          </IconButton>
          {playing ? (
            <IconButton
              outline="none"
              variant="link"
              aria-label="shuffle"
              fontSize="40px"
              onClick={toggleSongPlayedInPlayer}
            >
              <MdOutlinePauseCircleFilled color="white" />
            </IconButton>
          ) : (
            <IconButton
              outline="none"
              variant="link"
              aria-label="shuffle"
              fontSize="40px"
              onClick={toggleSongPlayedInPlayer}
            >
              <MdOutlinePlayCircleFilled color="white" />
            </IconButton>
          )}
          <IconButton
            outline="none"
            variant="link"
            aria-label="shuffle"
            fontSize="24px"
            onClick={setNextSong}
          >
            <MdSkipNext />
          </IconButton>
          <IconButton
            outline="none"
            variant="link"
            aria-label="shuffle"
            fontSize="24px"
            onClick={() => setRepeat((state) => !state)}
          >
            <MdOutlineRepeat color={`${repeat ? "#418220" : "#1e4d66"}`} />
          </IconButton>
        </ButtonGroup>
      </Center>
      <Box color="gray.500">
        <Flex align="center" justify="center">
          <Box width="10%">
            <Text fontSize="xs" marginLeft="0.9rem">
              {humanReadableTime(+seek.toFixed(0))}
            </Text>
          </Box>
          <Box width="80%">
            <RangeSlider
              aria-label={["min", "max"]}
              id="player-range"
              step={0.1}
              min={0}
              max={duration ? +duration.toFixed(2) : 0}
              onChange={onSeek}
              value={[seek]}
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="10%" marginLeft="20px">
            <Text fontSize="xs">
              {humanReadableTime(+duration.toFixed(0) || 0)}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default Player
