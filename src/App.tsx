import { useEffect, useState } from 'react'
import { UsersPage } from './users/users-page'
import { CreateUserPage } from './users/create/create-user-page'

function App() {
  const isServer = typeof window === 'undefined'
  const [route, setRoute] = useState(isServer ? '/' : window.location.pathname)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handlePopState = () => {
      setRoute(window.location.pathname)
    }
    window.addEventListener('popstate', handlePopState)

    setRoute(window.location.pathname)

    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (path: string) => {
    window.history.pushState({}, '', path)
    setRoute(path)
  }

  const renderRoute = () => {
    switch (route) {
      case '/':
        return <UsersPage navigate={navigate} />
      case '/users':
        return <UsersPage navigate={navigate} />
      case '/users/create':
        return <CreateUserPage navigate={navigate} />
      default:
        return <UsersPage navigate={navigate} />
    }
  }

  return <div>{renderRoute()}</div>
}

export default App
