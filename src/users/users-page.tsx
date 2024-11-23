import { UserTable } from './components/user-table'
import { UserSearch } from './components/user-search'
import { navigate } from '../contexts/router-context'

import './users-page.scss'

export const UsersPage = () => {
  return (
    <div className="users-page">
      <h1>Users Table</h1>
      <div className="users-page-header">
        <UserSearch />
        <button className="button-link" onClick={() => navigate('/create')}>
          Create user
        </button>
      </div>
      <UserTable />
    </div>
  )
}
