import express from 'express'
import { users } from './src/api/userData'

const app = express()
const PORT = 3002

// Middleware
app.use(express.json())

// Users API endpoint
app.get('/api/users', (_req, res) => {
  setTimeout(() => {
    res.json(users)
  }, 500)
})

app.listen(PORT, () => console.log(`express server listening on port ${PORT}`))
