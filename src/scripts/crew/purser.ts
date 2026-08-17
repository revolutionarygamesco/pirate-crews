import type Crew from './crew.ts'

class Purser {
  crew: Crew

  constructor (crew: Crew) {
    this.crew = crew
  }
}

export default Purser
