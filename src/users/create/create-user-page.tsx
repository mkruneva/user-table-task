import { CreateUserForm } from "./create-user-form";

import "../users-page.scss";

interface CreateUsersProps {
  navigate: (path: string) => void;
}

export const CreateUserPage = ({ navigate }: CreateUsersProps) => {
  return (
    <div className="users-page">
      <button className="back-button" onClick={() => navigate("/users")}>
        <BackArrowIcon />
        Back
      </button>
      <h2>Create New User</h2>
      <CreateUserForm />
    </div>
  );
};

const BackArrowIcon = () => (
  <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.46966 13.7803L6.99999 14.3107L8.06065 13.25L7.53032 12.7197L3.56065 8.75001H14.25H15V7.25001H14.25H3.56065L7.53032 3.28034L8.06065 2.75001L6.99999 1.68935L6.46966 2.21968L1.39644 7.2929C1.00592 7.68342 1.00592 8.31659 1.39644 8.70711L6.46966 13.7803Z"
      fill="currentColor"
    ></path>
  </svg>
);
