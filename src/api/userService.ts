import axiosInstance from './axiosInstance'

const baseUrl = `http://localhost:3002`

export const fetchUsers = async (searchTerm = '') => {
  try {
    const url = searchTerm
      ? `${baseUrl}/api/users?name=${encodeURIComponent(searchTerm)}`
      : `${baseUrl}/api/users`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch users')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.log('fetchUsers error:', error)
    throw error
  }
}

export const createUser = async (userFormData: FormData) => {
  const response = await axiosInstance.post('/api/users', userFormData, {
    headers: {
      'Content-type': 'multipart/form-data',
    },
  })

  return response.data.updatedUsers
}
