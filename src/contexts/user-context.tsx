import {
  useState,
  useEffect,
  createContext,
  useContext,
  PropsWithChildren,
} from 'react'

import { type User } from '../users/user-types'
import { fetchUsers } from '../api/userService'

type UserContextType = {
  users: User[]
  setUsers: (users: User[]) => void
  getUsers: (searchTerm?: string) => Promise<void>
  isLoading: boolean
  error: string | null
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getUsers = async (searchTerm = '') => {
    setIsLoading(true)
    try {
      const data = await fetchUsers(searchTerm)
      setUsers(data)
      setIsLoading(false)
    } catch (error) {
      console.error('Failed to load users:', error)
      setIsLoading(false)
      if ((error as Error)?.message) {
        setError((error as Error)?.message)
      } else {
        setError('An unexpected error occurred.')
      }
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  const contextValue: UserContextType = {
    users,
    setUsers,
    getUsers,
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
