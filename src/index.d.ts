declare class ChatMessage {
  create(data?: any, operation?: any): Promise<any>
}

declare class ApplicationV2 {
  render: (options: boolean) => Promise<ApplicationV2>
  close: (options?: any) => Promise<ApplicationV2>
  _onRender(context: any, options: any): Promise<void>
  _onClose(options: any): void
}

declare class DialogV2 extends ApplicationV2 {
  element: HTMLElement
  constructor(options?: any)
  close: (options?: any) => Promise<DialogV2>
}

interface Collection<K, V> extends Map<K, V> {
  find(predicate: (value: V, key: K, collection: this) => boolean): V | undefined
  filter(predicate: (value: V, key: K, collection: this) => boolean): V[]
  map<T>(callback: (value: V, key: K, collection: this) => T): T[]
  some(predicate: (value: V, key: K, collection: this) => boolean): boolean
  every(predicate: (value: V, key: K, collection: this) => boolean): boolean
  reduce<T>(callback: (accumulator: T, value: V, key: K, collection: this) => T, initial: T): T
  getName(name: string): V | undefined
  contents: V[]
}

interface User {
  id: string
}

interface Module {
  api: Record<string, Function>
}

declare const Hooks: {
  on: (name: string, callback: (...args: any[]) => void) => number
  once: (name: string, callback: (...args: any[]) => void) => number
  off: (name: string, fn: number | Function) => void
}

declare const game: {
  i18n: {
    format: (key: string, data?: Record<string, any>) => string
    localize: (key: string) => string
  },
  modules: Collection<string, Module>,
  user: User
}
