import { Hono } from 'hono'

const app = new Hono()

app.get('/', async (c) => {
  return c.text('Hello from Hono!')
})

export default app