import { FC, useState } from "react"
import { Box, Flex, HStack, Spacer, Text } from "@chakra-ui/layout"
import { Input, Button } from "@chakra-ui/react"
import { useSWRConfig } from "swr"
import { auth, AuthModes } from "../lib/mutations"
import { useRouter } from "next/router"
import Link from "next/link"
import { motion } from "framer-motion"

const AuthForm: FC<{ mode: AuthModes }> = ({ mode }) => {
  const router = useRouter()
  const [form, setForm] = useState({ email: "", password: "", name: "" })
  const [isLoading, setIsLoading] = useState(false)

  const onFormChange = (e: { target: { name: any; value: any } }) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const { email, password, name } = form

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    if (mode === "signup") {
      const user = await auth(mode, { name, email, password })
    } else if (mode === "signin") {
      const token = await auth(mode, { email, password })
    }
    setIsLoading(false)
    router.push("/")
  }
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.2 } }}
    >
      <Box height="100vh" width="100vw" bg="black" color="lightgreen">
        <Flex justify="center" align="center" height="100px">
          <HStack
            spacing="0.5rem"
            paddingX="3rem"
            marginTop="15rem"
            borderBottom="2px solid lightgreen"
            paddingBottom="1rem"
          >
            <img
              src="/logo.jpg"
              height="80px"
              width="50px"
              style={{ borderRadius: "18px" }}
            />
            <Spacer />
            <Text
              fontSize="x-large"
              color="lightgreen"
              fontWeight="semibold"
              style={formStyles.brandName}
              _hover={formStyles.brandNameHover}
            >
              Aesthetify
            </Text>
          </HStack>
        </Flex>
        <Flex justify="center" align="center" height="calc(100vh - 100px)">
          <Box padding="50px" bg="gray.900" borderRadius="5px">
            <form onSubmit={handleFormSubmit} style={formStyles.formInputsFlex}>
              <Text fontSize="2xl">
                {mode.slice(0, 1).toUpperCase() + mode.slice(1, 4)}{" "}
                {mode.slice(4)} to Aesthetify
              </Text>
              {mode === "signup" && (
                <>
                  <label
                    htmlFor="name"
                    style={{ alignSelf: "flex-start", margin: "4px 0px" }}
                  >
                    Your Username:
                  </label>
                  <Input
                    marginY="10px"
                    placeholder="name"
                    type="text"
                    name="name"
                    onChange={onFormChange}
                  />
                </>
              )}
              <label
                htmlFor="email"
                style={{ alignSelf: "flex-start", margin: "4px 0px" }}
              >
                Email:
              </label>
              <Input
                marginY="10px"
                placeholder="email"
                name="email"
                type="email"
                onChange={onFormChange}
              />
              <label
                htmlFor="password"
                style={{ alignSelf: "flex-start", margin: "4px 0px" }}
              >
                Your Password:
              </label>
              <Input
                marginY="10px"
                placeholder="password"
                name="password"
                type="password"
                onChange={onFormChange}
              />
              <Button
                marginTop="1rem"
                alignSelf="center"
                type="submit"
                bg="green.400"
                isLoading={isLoading}
                color="green.800"
                _hover={{ bg: "green.300", color: "green.900" }}
              >
                {mode.slice(0, 1).toUpperCase() + mode.slice(1, 4)}{" "}
                {mode.slice(4)}
              </Button>
            </form>
            {mode === "signin" ? (
              <Flex
                justify="center"
                align="center"
                height="30px"
                marginTop="1.4rem"
                width="20rem"
              >
                <Text>Want to have an account?</Text>
                <Link href="/signup" passHref>
                  <Text
                    color="blue.400"
                    marginLeft="1rem"
                    cursor="pointer"
                    _hover={{ color: "blue.300" }}
                  >
                    Sign Up
                  </Text>
                </Link>
              </Flex>
            ) : (
              <Flex
                justify="center"
                align="center"
                height="30px"
                marginTop="1.4rem"
                width="20rem"
              >
                <Text>Already have an account?</Text>
                <Link href="/signin" passHref>
                  <Text
                    color="blue.400"
                    marginLeft="1rem"
                    cursor="pointer"
                    _hover={{ color: "blue.300" }}
                  >
                    Sign In
                  </Text>
                </Link>
              </Flex>
            )}
          </Box>
        </Flex>
      </Box>
    </motion.div>
  )
}

export default AuthForm

const formStyles = {
  brandName: {
    letterSpacing: "1px",
    transition: "all 0.4s ease-out",
    marginTop: "-2px",
  },
  brandNameHover: {
    marginTop: "0px !important",
    borderBottom: "2px solid yellow",
  },
  formInputsFlex: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "40vw",
  },
}
