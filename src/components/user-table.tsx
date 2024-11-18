import { Table, type TableColumn } from "./table";
import { useUserContext, type User } from "../contexts/user-context";

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

export const UserTable = () => {
  const { filteredUsers, isErrored, isLoading } = useUserContext();

  return (
    <Table
      data={filteredUsers}
      columns={USERS_TABLE_COLUMNS}
      isLoading={isLoading}
      isErrored={isErrored}
    />
  );
};
