import { Song } from "@prisma/client"
import fetcher from "./fetcher"

export const favoriteSong = (body: Song) => {
  return fetcher("favorite", body)
}

export const unfavoriteSong = (body: Song) => {
  return fetcher("unfavorite", body)
}

export const isInFavorites = (body: Song) => {
  return fetcher("is_favorited", body)
}
