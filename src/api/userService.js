import axiosInstance from './axiosInstance'

export const fetchUsers = async (searchTerm = '') => {
  try {
    const response = await axiosInstance.get('/users', {
      params: { name: searchTerm },
    })
    return response.data.users
  } catch (error) {
    {
      throw new Error(
        `Fetch user request failed with status ${response.status} ${response.statusText}`
      )
    }
  }
}

export const createUser = async (user) => {
  try {
    const response = await axiosInstance.post('/users', user)
    return response.data.user
  } catch (error) {
    {
      throw new Error(
        `Create user request failed with status ${response.status} ${response.statusText}`
      )
    }
  }
}
