import {
  Box,
  List,
  ListIcon,
  ListItem,
  Divider,
  LinkBox,
  LinkOverlay,
  Text,
  Spacer,
  HStack,
} from "@chakra-ui/layout"
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from "react-icons/md"
import Link from "next/link"
import { usePlaylists } from "../lib/hooks"
import { useStoreState } from "easy-peasy"

const navMenu = [
  { name: "Home", icon: MdHome, route: "/" },
  { name: "Search", icon: MdSearch, route: "/search" },
  { name: "Your Library", icon: MdLibraryMusic, route: "/library" },
]

const musicMenu = [
  { name: "Create Playlist", icon: MdPlaylistAdd, route: "/" },
  { name: "Favorites", icon: MdFavorite, route: "/favorites" },
]

const Sidebar = () => {
  const { playlists } = usePlaylists()
  const activeSong = useStoreState((state: any) => state.activeSong)
  return (
    <Box
      width="100%"
      height={`${activeSong ? "calc(100vh - 100px)" : "100vh"}`}
      bg="black"
      paddingX="5px"
      color="gray"
    >
      <Box paddingY="20px" height="100%">
        <HStack spacing="0.5rem" paddingX="3rem">
          <Link href="/" passHref>
            <>
              <img
                src="/logo.jpg"
                height="50px"
                width="35px"
                style={{ borderRadius: "18px" }}
              />
              <Spacer />
              <Text
                fontSize="lg"
                color="lightgreen"
                fontWeight="semibold"
                style={{
                  letterSpacing: "1px",
                  transition: "all 0.4s ease-out",
                  marginTop: "-2px",
                }}
                _hover={{
                  marginTop: "0px !important",
                  borderBottom: "2px solid yellow",
                }}
              >
                Aesthetify
              </Text>
            </>
          </Link>
        </HStack>
        <Box marginBottom="20px" marginTop="20px" paddingX="1.5rem">
          <List spacing={2}>
            {navMenu.map((menu, idx) => (
              <ListItem
                key={idx}
                paddingX="20px"
                fontSize="15px"
                borderRadius={30}
                _hover={{ backgroundColor: "#312626" }}
              >
                <LinkBox>
                  <Link href={menu.route} passHref>
                    <LinkOverlay
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <ListIcon
                        as={menu.icon}
                        color="lightgreen"
                        marginRight="20px"
                      />
                      <span style={{ fontWeight: "bold", color: "#bb71bb" }}>
                        {menu.name}
                      </span>
                    </LinkOverlay>
                  </Link>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider width="80%" marginLeft="10%" color="gray.800" />
        <Box marginBottom="20px" marginTop="20px" paddingX="1.5rem">
          <List spacing={2}>
            {musicMenu.map((menu, idx) => (
              <ListItem
                key={idx}
                paddingX="20px"
                fontSize="15px"
                borderRadius={30}
                _hover={{ backgroundColor: "#312626" }}
              >
                <LinkBox>
                  <Link href={menu.route} passHref>
                    <LinkOverlay
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <ListIcon
                        as={menu.icon}
                        color="lightgreen"
                        marginRight="20px"
                      />
                      <span style={{ fontWeight: "bold", color: "#bb71bb" }}>
                        {menu.name}
                      </span>
                    </LinkOverlay>
                  </Link>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider width="80%" marginLeft="10%" color="gray.800" />
        <Box
          marginTop="1rem"
          height="45%"
          overflowY="auto"
          paddingY="1.5rem"
          paddingX="1.8rem"
          className="menuScrollable"
          marginRight="10px"
        >
          <List spacing={2}>
            {playlists.map((playlist) => (
              <ListItem
                key={playlist.id}
                paddingX="20px"
                borderRadius={30}
                _hover={{ backgroundColor: "#312626" }}
              >
                <LinkBox>
                  <Link href={`/playlist/${playlist.id}`} passHref>
                    <LinkOverlay>{playlist.name}</LinkOverlay>
                  </Link>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  )
}

export default Sidebar
