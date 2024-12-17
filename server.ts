import express from 'express'
import cors from 'cors'
import multer from 'multer'
import { users } from './src/api/userData'
import { User } from './src/users/user-types'

const app = express()
const PORT = 3002

// Middleware
app.use(cors())

// Parse JSON and URL-encoded bodies
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Multer for file uploads
const upload = multer({ storage: multer.memoryStorage() })

// GET Users API endpoint
app.get('/api/users', (req, res) => {
  setTimeout(() => {
    const { name } = req.query

    const filteredUsers = !name
      ? users
      : users.filter((user) =>
          user.name.toLowerCase().includes(String(name).toLowerCase())
        )

    return res.status(200).json(filteredUsers)
  }, 500)
})

// POST Users API endpoint
app.post('/api/users', upload.single('image'), (req, res) => {
  setTimeout(() => {
    try {
      const newUserData = req.body

      // Validate user data
      const validationResponse = validateUser(newUserData)
      if (validationResponse) return res.status(400).json(validationResponse)

      // Create new user with id
      const newUser = { ...newUserData, id: users.length + 1 }

      const userPhoto = req.file

      // Handle image file

      if (userPhoto) {
        // Convert buffer to base64
        const base64Image = `data:${userPhoto.mimetype};base64,${userPhoto.buffer.toString('base64')}`
        newUser.image = base64Image
      }

      users.unshift(newUser)

      return res.status(201).json(users)
    } catch (error) {
      console.log('post /api/users server error:', error)
      throw error
    }
  }, 500)
})

const validateUser = ({
  name,
  email,
  phone,
}: Pick<User, 'name' | 'email' | 'phone'>) => {
  const missingFields = []

  if (!name) missingFields.push('Name')
  if (!email) missingFields.push('Email')
  if (!phone) missingFields.push('Phone')

  if (missingFields.length > 0) {
    const message = `${missingFields.join(', ')}: required`

    return message
  }

  return null
}

app.listen(PORT, () => console.log(`express server listening on port ${PORT}`))
