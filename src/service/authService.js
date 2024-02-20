import axios from "../utils/axiosCustomize";

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

export { loginGoogle, postLogout, getNewToken, postLogin };
