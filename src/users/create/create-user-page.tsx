import { CreateUserForm } from './create-user-form'
import { BackArrowIcon } from '../../assets/svg/back-arrow-icon'

import '../users-page.scss'
import { User } from '../user-types'
import { useUserContext } from '../../contexts/user-context'
import { navigate } from '../../contexts/router-context'

export const CreateUserPage = () => {
  const { setUsers } = useUserContext()

  const handleUserCreate = (updatedUsers: User[]) => {
    // Update the user list in context and navigate back to the users page.
    // This is a front-end only implementation with mock data from the http response
    setUsers(updatedUsers)
    navigate('/')
  }

  return (
    <div className="users-page">
      <button className="back-button" onClick={() => navigate('/')}>
        <BackArrowIcon />
        Users Table
      </button>
      <h2>Create New User</h2>
      <CreateUserForm onCreate={handleUserCreate} />
    </div>
  )
}
