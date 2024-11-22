import axiosInstance from './axiosInstance'

export const fetchUsers = async (searchTerm = '') => {
  console.log('fetch users with searchTerm', searchTerm)
  const response = await axiosInstance.get('/users', {
    params: { name: searchTerm },
  })
  return response.data.users
}

export const createUser = async (user) => {
  const response = await axiosInstance.post('/users', user)
  return response.data.user
}
