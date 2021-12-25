import { createStore, action } from "easy-peasy"

export const store = createStore({
  activeSongs: [],
  activeSong: null,
  songPlaying: false,
  togglePlayingState: action((state: any, payload) => {
    state.songPlaying = payload
  }),
  changeActiveSongs: action((state: any, payload) => {
    state.activeSongs = payload
  }),
  changeActiveSong: action((state: any, payload) => {
    state.activeSong = payload
  }),
})
