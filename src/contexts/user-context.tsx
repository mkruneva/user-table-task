import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from "react";
import { useDebounce } from "use-debounce";

// TODO:
// import { type User } from '@/app/users/user-types'
import { fetchUsers } from "../api/userService";

const FETCH_USERS_URL =
  "https://dummyjson.com/users?delay=1000&select=firstName,lastName,email,image,phone";

export type User = {
  id: number;
  name: string;
  image: string;
  email: string;
  phone: string;
};

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
  const [debouncedFilter] = useDebounce(searchTerm, 300);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFilter]);

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
