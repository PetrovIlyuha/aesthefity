import cache from "memory-cache"

export const getImageByQuery = async (query) => {
  const url = `https://api.unsplash.com/search/photos?query=${query}`
  if (cache.get(url)) {
    return cache.get(url)
  } else {
    const res = await fetch(url, {
      headers: {
        "Accept-Version": "v1",
        Authorization: `Client-ID ${process.env.UNSPLASH_KEY}`,
      },
    })
    const data = await res.json()
    cache.put(url, data.results, 24 * 3600 * 1000)
    return data.results
  }
}
