import axiosInstance from './axiosInstance'

const baseUrl = `http://localhost:3002`

export const fetchUsers = async (searchTerm = '') => {
  // TODO: search term param
  console.log('searchTerm', searchTerm)
  const response = await fetch(`${baseUrl}/api/users`)

  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }

  const data = await response.json()
  return data
}

export const createUser = async (userFormData: FormData) => {
  const response = await axiosInstance.post('/api/users', userFormData, {
    headers: {
      'Content-type': 'multipart/form-data',
    },
  })

  return response.data.updatedUsers
}
