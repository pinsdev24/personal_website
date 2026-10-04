import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

type Db = ReturnType<typeof drizzle<typeof schema>>

let instance: Db | undefined

// Created on first use so `next build` works without DATABASE_URL.
export const db = new Proxy({} as Db, {
  get(_target, prop) {
    instance ??= drizzle(neon(process.env.DATABASE_URL!), { schema })
    const value = Reflect.get(instance, prop)
    return typeof value === 'function' ? value.bind(instance) : value
  },
})
