import { type WatchInstance } from '../types/instance.ts'

const isInWatchInstance = (
  instance: WatchInstance,
  timestamp: number
): boolean => {
  return timestamp > instance.start && timestamp <= instance.end
}

export default isInWatchInstance
