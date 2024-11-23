import React, { useCallback, useEffect, useState, useRef } from 'react'
import { useUserContext } from '../../user-context'

import { SearchIcon } from '../../../assets/svg/search-icon'
import { XIcon } from '../../../assets/svg/x-icon'

import './users-search.scss'
import { useDebounce } from 'use-debounce'

const DEBOUNCE_DELAY = 700

export const UserSearch = () => {
  const { getUsers } = useUserContext()
  const [searchTerm, setSearchTerm] = useState('')
  const debounceDelay = searchTerm.trim() === '' ? 0 : DEBOUNCE_DELAY
  const [debouncedSearchTerm] = useDebounce(searchTerm.trim(), debounceDelay)

  const mounted = useRef(false)

  const clearSearch = useCallback(() => {
    setSearchTerm('')
  }, [])

  useEffect(() => {
    // Do not call use Effect on initial mount
    if (mounted.current) {
      getUsers(debouncedSearchTerm)
    } else {
      mounted.current = true
    }
  }, [debouncedSearchTerm])

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
