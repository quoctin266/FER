import axios from "../utils/axiosCustomize";

const loginGoogle = async (data) => {
  return await axios.post("/google-login", data);
};

export { loginGoogle };
