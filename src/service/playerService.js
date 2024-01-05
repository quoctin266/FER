import axios from "../utils/axiosCustomize";

const getAllPlayer = async () => {
  return await axios.get("players");
};

export { getAllPlayer };
