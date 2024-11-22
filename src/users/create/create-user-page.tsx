import { CreateUserForm } from './create-user-form'
import { BackArrowIcon } from '../../assets/svg/back-arrow-icon'

import '../users-page.scss'
import { User } from '../user-types'
import { UserProvider, useUserContext } from '../user-context'

interface CreateUsersProps {
  navigate: (path: string) => void
}

export const CreateUser = ({ navigate }: CreateUsersProps) => {
  const { users, setUsers } = useUserContext()

  const handleUserCreate = (updatedUsers: User[]) => {
    setUsers(updatedUsers)
    navigate('/users')
  }

  return (
    <div className="users-page">
      <button className="back-button" onClick={() => navigate('/users')}>
        <BackArrowIcon />
        Back
      </button>
      <h2>Create New User</h2>
      <CreateUserForm onCreate={handleUserCreate} />
    </div>
  )
}

export const CreateUserPage = ({ navigate }: CreateUsersProps) => (
  <UserProvider>
    <CreateUser navigate={navigate} />
  </UserProvider>
)
