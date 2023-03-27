import events from 'events'
import express from 'express'
import mongoose from 'mongoose'
import todos from './routes/todos'

const port = process.env.PORT || 4000

async function main() {
  mongoose.connect('mongodb://127.0.0.1:27017/todoapp')

  const app = express()
  app.use(express.json({ strict: false }))
  app.use('/todos/', todos)
  const server = app.listen(port)
  events.once(server, 'listen')
  console.log(`Serving at http://localhost:${port}/`)

  await Promise.any([
    events.once(process, 'SIGINT'),
    events.once(process, 'SIGTERM'),
    events.once(process, 'SIGUSR2'),
  ])
  console.log('Graceful shutdown...')

  server.close()
  events.once(server, 'close')

  await mongoose.disconnect()
}

main().catch(console.error)
