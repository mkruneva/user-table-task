import { useEffect, useState } from 'react'
import { UsersPage } from './users/users-page'
import { CreateUserPage } from './users/create/create-user-page'
import { UserProvider } from './users/user-context'

/** App serves as a client side router
 * using hash to allow page refresh
 */
function App() {
  const isServer = typeof window === 'undefined'
  const [route, setRoute] = useState(
    isServer ? '/' : window.location.hash.slice(1) || '/'
  )

  useEffect(() => {
    if (isServer) return
    const handleHashChange = () => {
      setRoute(window.location.hash.slice(1) || '/')
    }
    window.addEventListener('hashchange', handleHashChange)
    setRoute(window.location.hash.slice(1) || '/')

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigate = (path: string) => {
    if (window.location.hash.slice(1) !== path) {
      window.location.hash = path
      setRoute(path)
    }
  }

  const renderRoute = () => {
    switch (route) {
      case '/':
      case '/users':
        return <UsersPage navigate={navigate} />
      case '/user-create':
        return <CreateUserPage navigate={navigate} />
      default:
        return <div>Not found</div>
    }
  }

  return <UserProvider>{renderRoute()}</UserProvider>
}

export default App
