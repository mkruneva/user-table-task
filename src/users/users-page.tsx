import { UserTable } from './components/user-table'
import { UserSearch } from './components/user-search'

import './users-page.scss'

interface UsersProps {
  navigate: (path: string) => void
}

export const UsersPage = ({ navigate }: UsersProps) => {
  return (
    <div className="users-page">
      <h1>Users Table</h1>
      <div className="users-page-header">
        <UserSearch />
        <button
          className="button-link"
          onClick={() => navigate('/user-create')}
        >
          Create user
        </button>
      </div>
      <UserTable />
    </div>
  )
}
