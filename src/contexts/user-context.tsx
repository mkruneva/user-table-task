"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from "react";
import { useDebouncedCallback } from "use-debounce";

const FETCH_USERS_URL =
  "https://dummyjson.com/users?delay=1000&select=firstName,lastName,email,image,phone";

export type User = {
  id: number;
  name: string;
  image: string;
  email: string;
  phone: string;
};

// TODO: remove UserData
type UserData = Omit<User, "name"> & {
  lastName: string;
  firstName: string;
};

// Create the context
type UserContextType = {
  users: User[];
  fetchUsers: () => Promise<void>;
  filteredUsers: User[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  clearSearch: () => void;
  isLoading: boolean;
  isErrored: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const initialUsers: User[] = [];

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const [searchTerm, setSearchTerm] = useState("");
  // TODO: isLoading state should not be false
  const [isLoading, setIsLoading] = useState(true);
  const [isErrored, setIsErrored] = useState(false);

  const filterUsers = useDebouncedCallback(async (value: string) => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/users/search?q=${value}&delay=1000&select=firstName,lastName,email,image,phone`
        );

        console.log("response", response);

        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const result: { users: any[] } = await response.json();

        const filtered = !result?.users?.length
          ? []
          : result.users.map(({ firstName, lastName, ...otherData }) => ({
              name: `${firstName} ${lastName}`,
              ...otherData,
            }));

        setFilteredUsers(filtered);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setIsErrored(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, 300);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers(searchTerm);

    return () => {
      filterUsers.cancel();
    };
  }, [searchTerm, filterUsers]);

  const fetchUsers = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(FETCH_USERS_URL);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const result: { users: UserData[] } = await response.json();

      // TODO: use api call returning name only
      const users = !result?.users?.length
        ? []
        : result.users.map(({ firstName, lastName, ...otherData }) => ({
            name: `${firstName} ${lastName}`,
            ...otherData,
          }));

      setUsers(users);
      setFilteredUsers(users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setIsErrored(true);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = useCallback(() => {
    setSearchTerm("");
    setFilteredUsers(users);
  }, [users]);

  const contextValue: UserContextType = {
    users,
    fetchUsers,
    filteredUsers,
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
