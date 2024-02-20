import axios from "../utils/axiosCustomize";

const postRegister = async (data) => {
  return await axios.post(`/auth/register`, data);
};

const loginGoogle = async (data) => {
  return await axios.post("/auth/google-login", data);
};

const postLogin = async (data) => {
  return await axios.post("/auth/login", data);
};

const postLogout = async () => {
  return await axios.post("/auth/logout");
};

const getNewToken = async (data) => {
  return await axios.post("/auth/refresh", data);
};

const patchUpdateUser = async (data, id) => {
  return await axios.patch(`/users/${id}`, data);
};

const postChangePassword = async (data) => {
  return await axios.post(`/auth/reset-password`, data);
};

const getUsers = async () => {
  return await axios.get(`/users?role=1`);
};

export {
  loginGoogle,
  postLogout,
  getNewToken,
  postLogin,
  postRegister,
  patchUpdateUser,
  postChangePassword,
  getUsers,
};
