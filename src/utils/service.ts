import { Api } from 'client'

export const Horse = new Api({
  timeout: 10_000
})

export * from 'client'
export default Horse
