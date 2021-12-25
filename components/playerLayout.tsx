import { Box } from "@chakra-ui/layout"
import Sidebar from "./sidebar"
import SidebarSlidable from "./layoutServiceComponents/SidebarSlidable"
import { CgMenuRound } from "react-icons/cg"
import useSidebarVisibility from "../hooks/useSidebarVisibility"
import PlayerBar from "./PlayerBar"
import { useStoreState } from "easy-peasy"
import { motion } from "framer-motion"

const PlayerLayout = ({ children }) => {
  const { sidebarShown, setToggleSidebar, isDesktop } = useSidebarVisibility()
  const activeSong = useStoreState((state: any) => state.activeSong)
  return (
    <Box width="100vw" height="100vh">
      {sidebarShown && (
        <SidebarSlidable>
          <Box position="absolute" top={0} width="250px" left={0}>
            <Sidebar />
          </Box>
        </SidebarSlidable>
      )}
      {!isDesktop && (
        <CgMenuRound onClick={setToggleSidebar} className="sidebarMenuIcon" />
      )}
      <Box
        marginLeft={`${sidebarShown ? "250px" : "0px"}`}
        marginBottom="100px"
      >
        <Box height={`${activeSong ? "calc(100vh - 100px)" : "100vh"}`}>
          {children}
        </Box>
      </Box>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { delay: 0.2, duration: 0.2 },
        }}
      >
        <Box
          position="absolute"
          left="0"
          bottom="0"
          height={`${activeSong ? "100px" : "0px"}`}
        >
          <PlayerBar />
        </Box>
      </motion.div>
    </Box>
  )
}

export default PlayerLayout
