import { Box, Flex, Text } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/react"

const MainPageLayout = ({
  color,
  image,
  subtitle,
  title,
  descriptionDetails,
  roundedImage,
  children,
}) => {
  return (
    <Box
      height="100%"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 20%, ${color}.700 30%, rgba(0,0,0,0.95) 75%)`}
    >
      <Flex padding="3rem" align="end" bg={`${color}.600`}>
        <Box padding="20px">
          <Image
            boxSize="150px"
            boxShadow="2xl"
            src={image}
            borderRadius={roundedImage ? "50%" : "0%"}
          />
        </Box>
        <Box padding="20px" lineHeight="40px" color="whatsapp.200">
          <Text fontSize="xx-small" fontWeight="bold" casing="uppercase">
            {subtitle}
          </Text>
          <Text fontSize="6xl" fontWeight="semibold">
            {title}
          </Text>
          <Text fontSize="sm" fontWeight="100" marginTop="1rem">
            {descriptionDetails}
          </Text>
        </Box>
      </Flex>
      <Box paddingY="50px">{children}</Box>
    </Box>
  )
}

export default MainPageLayout
