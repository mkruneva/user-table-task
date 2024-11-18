import React from "react";
import { useUserContext } from "../contexts/user-context";

import "./users-search.scss";

export const UsersSearch = () => {
  const { searchTerm, setSearchTerm, clearSearch } = useUserContext();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

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
  );
};

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => <input ref={ref} {...props} className="search-box__input" />);

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
