import { useEffect, useState } from "react";
import { Table, type TableColumn } from "./table";

import "./users.scss";

export type User = {
  id: number;
  name: string;
  image: string;
  email: string;
  phone: string;
};

type UserData = Omit<User, "name"> & { lastName: string; firstName: string };

const FETCH_USERS_URL =
  "https://dummyjson.com/users?delay=1000&select=firstName,lastName,email,image,phone";

const USERS_TABLE_COLUMNS: TableColumn<User, keyof User>[] = [
  {
    label: "Image",
    accessor: "image",
    renderCellContent: ({ image, name }: User) => {
      return <img className="avatar" src={image} alt={`${name}'s avatar`} />;
    },
  },
  { label: "Name", accessor: "name" },
  { label: "Email", accessor: "email" },
  { label: "Phone", accessor: "phone" },
];

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isErrored, setIsErrored] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(FETCH_USERS_URL);
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const result: { users: UserData[] } = await response.json();

        const users = !result?.users?.length
          ? []
          : result.users.map(({ firstName, lastName, ...otherData }) => ({
              name: `${firstName} ${lastName}`,
              ...otherData,
            }));

        setUsers(users);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setIsErrored(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="users-container">
      <h1>Users Table</h1>
      <Table
        data={users}
        columns={USERS_TABLE_COLUMNS}
        isLoading={isLoading}
        isErrored={isErrored}
      />
    </div>
  );
};
