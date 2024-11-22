import axiosInstance from "./axiosInstance";
import MockAdapter from "axios-mock-adapter";
import { users } from "./userData";

const mock = new MockAdapter(axiosInstance, { delayResponse: 500 });

mock.onGet("/users").reply(200, {
  users,
});

// Mock GET /users with query parameters for filtering
mock.onGet(/\/users\?.*/).reply((config) => {
  const params = new URLSearchParams(config.params);
  const nameFilter = params.get("name");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  return [200, { users: filteredUsers }];
});

mock.onPost("/users").reply((config) => {
  const newUser = JSON.parse(config.data);
  newUser.id = users.length + 1;
  users.push(newUser);

  return [201, { user: newUser }];
});

export default mock;
