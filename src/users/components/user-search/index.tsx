import React from 'react'
import { useUserContext } from '../../user-context'

import { SearchIcon } from '../../../assets/svg/search-icon'
import { XIcon } from '../../../assets/svg/x-icon'

import './users-search.scss'

export const UserSearch = () => {
  const { searchTerm, setSearchTerm, clearSearch } = useUserContext()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="search-box">
      <div className="search-box__input-container">
        <Input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-box__input"
        />
        <span className="search-box__search-icon">
          <SearchIcon />
        </span>

        {searchTerm && (
          <button
            onClick={clearSearch}
            className="search-box__button"
            aria-label="Clear search"
          >
            <XIcon />
          </button>
        )}
      </div>
    </div>
  )
}

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => <input ref={ref} {...props} className="search-box__input" />)
Input.displayName = 'SearchInput'
