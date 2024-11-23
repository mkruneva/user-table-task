import axiosInstance from './axiosInstance'

export const fetchUsers = async (searchTerm = '') => {
  const response = await axiosInstance.get('/api/users', {
    params: { name: searchTerm },
  })
  return response.data.users
}

export const createUser = async (userFormData: FormData) => {
  const response = await axiosInstance.post('/api/users', userFormData, {
    headers: {
      'Content-type': 'multipart/form-data',
    },
  })

  return response.data.updatedUsers
}
