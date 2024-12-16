import axiosInstance from './axiosInstance'
import MockAdapter from 'axios-mock-adapter'
import { users } from './userData'

const mock = new MockAdapter(axiosInstance, { delayResponse: 500 })

mock.onGet('/api/users').reply((config) => {
  const params = new URLSearchParams(config.params)
  const nameFilter = params.get('name')
  const pageString = params.get('page')
  const page = pageString ? Number(pageString) : 0
  const pageSize = params.get('pageSize')

  const totalNumUsers = users.length
  const totalPages = Math.ceil(totalNumUsers / pageSize)

  if (Number(page) > totalPages) {
    return [400, { message: 'Page number exceeds total pages.' }]
  }

  const getPaginatedUsers = (usersToPaginate) => {
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    return usersToPaginate.slice(startIndex, endIndex)
  }

  const getFilteredUsers = () => {
    if (!nameFilter) return users

    return users.filter((user) =>
      user.name.toLowerCase().includes(nameFilter.toLowerCase())
    )
  }

  const filteredUsers = getFilteredUsers()
  const paginatedFilteredUsers = getPaginatedUsers(filteredUsers)

  return [200, { users: paginatedFilteredUsers, totalNumUsers, page, pageSize }]
})

mock.onPost('/api/users').reply((config) => {
  const formData = config.data

  const newUser = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    image: formData.get('image'),
  }

  const validationResponse = validateUser(newUser)
  if (validationResponse) return validationResponse

  // Handle image file
  if (newUser.image) {
    const reader = new FileReader()
    reader.onloadend = () => (newUser.image = reader.result)
    reader.readAsDataURL(newUser.image)
  }

  newUser.id = users.length + 1
  users.unshift(newUser)

  return [201, { updatedUsers: users }]
})

const validateUser = ({ name, email, phone }) => {
  const missingFields = []

  if (!name) missingFields.push('Name')
  if (!email) missingFields.push('Email')
  if (!phone) missingFields.push('Phone')

  if (missingFields.length > 0) {
    const message = `${missingFields.join(', ')}: required`
    return [201, { message }]
  }

  return null
}

export default mock
