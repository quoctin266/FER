import axios from "../utils/axiosCustomize";

const loginGoogle = async (data) => {
  return await axios.post("/auth/google-login", data);
};

const postLogout = async () => {
  return await axios.post("/auth/logout");
};

export { loginGoogle, postLogout };
