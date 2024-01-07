import axios from "../utils/axiosCustomize";

const loginGoogle = async (data) => {
  return await axios.post("/google-login", data);
};

const postLogout = async () => {
  return await axios.post("/logout");
};

export { loginGoogle, postLogout };
