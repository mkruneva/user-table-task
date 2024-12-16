import {
  useState,
  useEffect,
  createContext,
  useContext,
  PropsWithChildren,
} from 'react'

import { type User } from '../users/user-types'
import { fetchUsers } from '../api/userService'
import { isAxiosError } from 'axios'

type UserContextType = {
  users: User[]
  setUsers: (users: User[]) => void
  getUsers: (props: {
    searchTerm?: string
    pageToGet?: number
  }) => Promise<void>
  isLoading: boolean
  error: string | null
  totalNumUsers: number
  currentPage: number
  pageSize: number
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [users, setUsers] = useState<User[]>([])
  const [totalNumUsers, setTotalNumUsers] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // TODO: searchTem default
  const getUsers = async ({ searchTerm = '', pageToGet = 1 }) => {
    setIsLoading(true)
    try {
      const { users, totalNumUsers, page } = await fetchUsers({
        searchTerm,
        page: pageToGet,
        pageSize,
      })
      setUsers(users)
      setTotalNumUsers(totalNumUsers)
      setCurrentPage(page)
      setIsLoading(false)
    } catch (error) {
      console.error('Failed to load users:', error)
      setIsLoading(false)
      if (isAxiosError(error) && error.response) {
        setError(
          `Error: ${error.response.status} - ${error.response.statusText}`
        )
      } else {
        setError('An unexpected error occurred.')
      }
    }
  }

  useEffect(() => {
    getUsers({ searchTerm: undefined, pageToGet: 1 })
  }, [])

  const contextValue: UserContextType = {
    users,
    setUsers,
    getUsers,
    totalNumUsers,
    currentPage,
    pageSize,
    isLoading,
    error,
  }

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  )
}

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider')
  }
  return context
}
