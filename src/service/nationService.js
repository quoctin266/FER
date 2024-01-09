import axios from "../utils/axiosCustomize";

const getAllNation = async () => {
  return await axios.get("nations");
};

export { getAllNation };
