import { UsersPage } from './users/users-page'
import { CreateUserPage } from './users/create/create-user-page'
import { UserProvider } from './contexts/user-context'
import {
  type RoutesMap,
  RouterProvider,
  Router,
} from './contexts/router-context'

function App() {
  const routes: RoutesMap = {
    '/': UsersPage,
    '/create': CreateUserPage,
  }
  return (
    <RouterProvider>
      <UserProvider>
        <Router routes={routes} />
      </UserProvider>
    </RouterProvider>
  )
}

export default App
