import express from 'express'
import cors from 'cors'
import { users } from './src/api/userData'

const app = express()
const PORT = 3002

// Middleware
app.use(cors())
app.use(express.json())

// Users API endpoint
app.get('/api/users', (req, res) => {
  setTimeout(() => {
    const { name } = req.query

    // If no name provided, return all users
    if (!name) {
      return res.json(users)
    }

    // Case-insensitive search
    const searchTerm = String(name).toLowerCase()
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm)
    )

    return res.json(filteredUsers)
  }, 500)
})

app.listen(PORT, () => console.log(`express server listening on port ${PORT}`))
