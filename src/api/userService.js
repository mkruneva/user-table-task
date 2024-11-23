import axiosInstance from './axiosInstance'

export const fetchUsers = async (searchTerm = '') => {
  const response = await axiosInstance.get('/api/users', {
    params: { name: searchTerm },
  })
  return response.data.users
}

export const createUser = async (user) => {
  const response = await axiosInstance.post('/api/users', user)
  return response.data.user
}
