
import { useMediaQuery } from 'react-responsive'
import { useState, useEffect } from 'react'

const useSidebarVisibility = () => {
  const [sidebarShown, setSidebarShown] = useState(false)
  const isDesktop = useMediaQuery({ minWidth: 799 })

  const setToggleSidebar = () => setSidebarShown(!sidebarShown)

  useEffect(() => {
    isDesktop ? setSidebarShown(true) : setSidebarShown(false)
  }, [isDesktop])
  return { sidebarShown, setToggleSidebar, isDesktop }
}

export default useSidebarVisibility
