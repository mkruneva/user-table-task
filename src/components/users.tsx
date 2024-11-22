import { UsersSearch } from "./users-search";
import { UserTable } from "./user-table";
import { UserProvider } from "../contexts/user-context";

import "./users.scss";
interface UsersProps {
  navigate: (path: string) => void;
}

export const Users = ({ navigate }: UsersProps) => {
  return (
    <div className="users-page">
      <h1>Users Table</h1>
      <UserProvider>
        <div className="users-page-header">
          {/* <UserSearch /> */}
          <button
            className="button-link"
            onClick={() => navigate("/users/create")}
          >
            Create user
          </button>
        </div>
        <UserTable />
      </UserProvider>
    </div>
  );
};
