import {
  createContext,
  useContext,
  useEffect,
  useState,
  PropsWithChildren,
  ComponentType,
} from 'react'

type RouterContextType = {
  currentPath: string
  navigate: (path: string) => void
}

const RouterContext = createContext<RouterContextType>({
  currentPath: '/',
  navigate: () => null,
})

export const RouterProvider = ({ children }: PropsWithChildren) => {
  const [currentPath, setCurrentPath] = useState<string>(
    window.location.hash.slice(1) || '/'
  )

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash.slice(1) || '/')
    }

    window.addEventListener('hashchange', handleHashChange)

    if (!window.location.hash) {
      window.location.hash = '/'
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const navigate = (path: string) => {
    window.location.hash = path
  }

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  )
}

const RouteNotFound = () => {
  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 600)
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Not found</h1>
      <p>Redirecting to /</p>
    </div>
  )
}

export const useRouter = () => {
  const context = useContext(RouterContext)
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider')
  }
  return context
}

export type RoutesMap = {
  [path: string]: ComponentType
}

export const Router = ({ routes }: { routes: RoutesMap }) => {
  const { currentPath } = useRouter()
  const Component = routes[currentPath] || (() => <RouteNotFound />)

  return <Component />
}

export const navigate = (path: string) => {
  window.location.hash = path
}
