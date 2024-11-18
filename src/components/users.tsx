import { UsersSearch } from "./users-search";
import { UserTable } from "./user-table";
import { UserProvider } from "../contexts/user-context";

import "./users.scss";

export const Users = () => {
  return (
    <UserProvider>
      <div className="users-container">
        <h1>Users Table</h1>
        <UsersSearch />
        <UserTable />
      </div>
    </UserProvider>
  );
};

// TODO: ? use react server component ?
