const baseUrl = `http://localhost:3002`

export const fetchUsers = async (searchTerm = '') => {
  try {
    const url = searchTerm
      ? `${baseUrl}/api/users?name=${encodeURIComponent(searchTerm)}`
      : `${baseUrl}/api/users`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      if (response.status) {
        throw new Error(`${response.status}:  ${response.statusText}`)
      } else {
        throw new Error('Failed to fetch users')
      }
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.log('fetchUsers error:', error)
    throw error
  }
}

export const createUser = async (userFormData: FormData) => {
  try {
    const url = `${baseUrl}/api/users`
    const response = await fetch(url, {
      method: 'POST',
      body: userFormData,
    })

    if (!response.ok) {
      if (response.status) {
        throw new Error(`${response.status}:  ${response.statusText}`)
      } else {
        throw new Error('Failed to create user')
      }
    }

    const data = await response.json()

    return data
  } catch (error) {
    console.log('createUser error:', error)
    throw error
  }
}
