import "@testing-library/jest-dom";

import { screen, render } from "@testing-library/react";
import { type User } from "../../users/user-types";
import { Table, type TableColumn } from "./";

const mockUser = {
  id: 1,
  name: "Emily Johnson",
  email: "emily.johnson@x.dummyjson.com",
  image: "https://dummyjson.com/icon/emilys/128",
  phone: "+81 965-431-3024",
};

const mockData: User[] = [
  mockUser,
  {
    id: 2,
    name: "Michael Williams",
    email: "michael.williams@x.dummyjson.com",
    image: "https://dummyjson.com/icon/michaelw/128",
    phone: "+49 258-627-6644",
  },
  {
    id: 3,
    name: "Sophia Brown",
    email: "sophia.brown@x.dummyjson.com",
    image: "https://dummyjson.com/icon/sophiab/128",
    phone: "+81 210-652-2785",
  },
  {
    id: 4,
    name: "James Davis",
    email: "james.davis@x.dummyjson.com",
    image: "https://dummyjson.com/icon/jamesd/128",
    phone: "+49 614-958-9364",
  },
];

const mockColumns: TableColumn<User, keyof User>[] = [
  { label: "Name", accessor: "name" },
  {
    label: "Image",
    accessor: "image",
    renderCellContent: ({ rowData: { image, name } }) => {
      return <img className="avatar" src={image} alt={`${name}'s avatar`} />;
    },
  },
  { label: "Email", accessor: "email" },
  { label: "Phone", accessor: "phone" },
];

describe("Table", () => {
  test("renders user details", () => {
    render(<Table data={mockData} columns={mockColumns} />);
    const nameElement = screen.getByText(/James Davis/i);
    expect(nameElement).toBeInTheDocument();

    const emailElement = screen.getByText(/james.davis@x.dummyjson.com/i);
    expect(emailElement).toBeInTheDocument();

    const phoneElement = screen.getByText(/49 614-958-9364/i);
    expect(phoneElement).toBeInTheDocument();
  });

  it("should render table header", () => {
    render(<Table data={mockData} columns={mockColumns} />);

    const nameColumn = screen.getByText(/name/i);
    expect(nameColumn).toBeInTheDocument();

    const imageColumn = screen.getByText(/email/i);
    expect(imageColumn).toBeInTheDocument();
  });

  it("should render custom image column", () => {
    render(<Table data={[mockUser]} columns={mockColumns} />);

    const image = screen.getByAltText(/Emily Johnson's avatar/i);

    expect(image.tagName).toBe("IMG");
    expect(image).toBeInTheDocument();

    const imageColumn = screen.getByText(/image/i);
    expect(imageColumn).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { container } = render(
      <Table data={mockData} columns={mockColumns} />
    );
    expect(container).toMatchSnapshot();
  });
});
