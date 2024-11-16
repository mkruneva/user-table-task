import { useEffect, useState } from "react";
import { UserTable } from "./user-table";
import { SkeletonTable } from "./skeleton-table";
import "./users.scss";

type UserData = {
  id: string;
  firstName: string;
  lastName: string;
  image: string;
  email: string;
  phone: string;
}[];

export const Users = () => {
  const [users, setUsers] = useState<UserData>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/users?delay=1000&select=firstName,lastName,email,image,phone"
        );
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const result = await response.json();

        setUsers(result.users);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (!loading && (!users || !users?.length)) {
    return <div>No users found</div>;
  }

  const userData = users.map((u) => {
    const { firstName, lastName, ...userData } = u;
    return { name: `${firstName} ${lastName}`, ...userData };
  });

  return (
    <div className="users-container">
      <h1>Users</h1>
      {loading ? (
        <SkeletonTable rows={10} columns={4} />
      ) : (
        <UserTable
          data={userData}
          columns={["image", "name", "email", "phone"]}
        />
      )}
    </div>
  );
};
