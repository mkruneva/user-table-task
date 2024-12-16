import { User } from '../users/user-types'
import axiosInstance from './axiosInstance'

type PaginatedResponse<T> = {
  users: T[]
  totalNumUsers: number
  page: number
  pageSize: number
}

type FetchUsersProps = {
  searchTerm?: string
  page: number
  pageSize?: number
}

export const fetchUsers = async ({
  searchTerm = '',
  page = 1,
  pageSize,
}: FetchUsersProps): Promise<PaginatedResponse<User>> => {
  const response = await axiosInstance.get('/api/users', {
    params: { name: searchTerm, page, pageSize },
  })

  return response.data
}

export const createUser = async (userFormData: FormData): Promise<User[]> => {
  const response = await axiosInstance.post('/api/users', userFormData, {
    headers: {
      'Content-type': 'multipart/form-data',
    },
  })

  return response.data.updatedUsers
}
