import { type Watch } from './types/watch.ts'
import { createWatchSetData, type WatchSetData } from './types/set.ts'
import { type WatchInstance } from './types/instance.ts'
import isInWatchInstance from './methods/in-instance.ts'

export default class WatchSet {
  watches: Watch[]
  offset: number

  constructor (options?: Partial<WatchSetData>) {
    const { watches, offset } = createWatchSetData(options)
    this.offset = offset
    this.watches = watches
  }

  get dayLength () {
    return this.watches.reduce((acc, curr) => acc + curr.duration, 0)
  }

  getInstances (timestamp: number): WatchInstance[] {
    const day = Math.floor((timestamp - this.offset) / this.dayLength)
    let start = (day * this.dayLength) + this.offset
    const instances: WatchInstance[] = []

    for (const watch of this.watches) {
      instances.push({ ...watch, start, end: start + watch.duration })
      start += watch.duration
    }

    return instances
  }

  getCurrent (timestamp: number): WatchInstance {
    const instances = this.getInstances(timestamp)
    for (const instance of instances) {
      if (isInWatchInstance(instance, timestamp)) return instance
    }
    return instances[instances.length - 1]
  }

  getInstancesBetween (start: number, end: number): WatchInstance[] {
    const first = this.getCurrent(start)
    const instances: WatchInstance[] = [first]
    let timestamp = first.end
    let index = this.watches.findIndex(watch => watch.name === first.name)
    if (index < 0) return instances

    while (timestamp < end) {
      index++
      const watch = this.watches[index % this.watches.length]
      instances.push({ ...watch, start: timestamp, end: timestamp + watch.duration })
      timestamp += watch.duration
    }

    return instances
  }

  toObject (): WatchSetData {
    return {
      watches: this.watches,
      offset: this.offset
    }
  }
}
