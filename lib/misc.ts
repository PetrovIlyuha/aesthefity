export const humanReadableTime = (duration: number) => {
  const minutes = Math.floor(duration / 60)
  const seconds = duration % 60
  return `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`
}

export function throttle(callback, interval) {
  let enableCall = true

  return function (...args) {
    if (!enableCall) return

    enableCall = false
    callback.apply(this, args)
    setTimeout(() => (enableCall = true), interval)
  }
}
