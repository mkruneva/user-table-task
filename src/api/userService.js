import axiosInstance from "./axiosInstance";

export const fetchUsers = async (searchTerm = "") => {
  try {
    const response = await axiosInstance.get("/users", {
      params: { name: searchTerm },
    });
    return response.data.users;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (user) => {
  try {
    const response = await axiosInstance.post("/users", user);
    return response.data.user;
  } catch (error) {
    throw error;
  }
};
