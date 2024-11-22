"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from "react";
import { useDebounce } from "use-debounce";

import { type User } from "../users/user-types";
import { fetchUsers } from "../api/userService";

type UserContextType = {
  users: User[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  clearSearch: () => void;
  isLoading: boolean;
  isErrored: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isErrored, setIsErrored] = useState(false);
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  useEffect(() => {
    const controller = new AbortController();

    const filterUsers = async () => {
      try {
        const data = await fetchUsers(searchTerm);
        setUsers(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load users:", error);
        setIsLoading(false);
        setIsErrored(true);
      }
    };
    filterUsers();

    return () => {
      controller.abort();
    };
    // only fetch on debouncedSearch
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const clearSearch = useCallback(() => {
    setSearchTerm("");
  }, []);

  const contextValue: UserContextType = {
    users,
    searchTerm,
    setSearchTerm,
    clearSearch,
    isLoading,
    isErrored,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
