import fetcher from "./fetcher"

interface UserAuthInterface {
  email: string
  password: string
  name?: string
}

export type AuthModes = "signin" | "signup"

export const auth = (mode: AuthModes, body: UserAuthInterface) => {
  return fetcher(`${mode}`, body)
}
