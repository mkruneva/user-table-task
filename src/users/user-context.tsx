import React, { useState, useEffect, createContext, useContext } from 'react'

import { type User } from '../users/user-types'
import { fetchUsers } from '../api/userService'
import { isAxiosError } from 'axios'

type UserContextType = {
  users: User[]
  setUsers: (users: User[]) => void
  getUsers: (searchTerm?: string) => Promise<void>
  isLoading: boolean
  error: string | null
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const getUsers = async (searchTerm = '') => {
    try {
      const data = await fetchUsers(searchTerm)
      setUsers(data)
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
