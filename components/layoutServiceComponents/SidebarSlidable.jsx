import { AnimatePresence, motion } from "framer-motion"

const SidebarSlidable = ({ children }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -250 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.2 } }}
        exit={{ opacity: 0, x: -250, transition: { duration: 0.2 } }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default SidebarSlidable
