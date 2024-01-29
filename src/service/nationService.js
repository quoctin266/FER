import axios from "../utils/axiosCustomize";

const getAllNation = async () => {
  return await axios.get("nations");
};

const postCreateNation = async (data) => {
  return await axios.post("nations", data);
};

const patchUpdateNation = async (data, id) => {
  return await axios.patch(`nations/${id}`, data);
};

const deleteNation = async (id) => {
  return await axios.delete(`nations/${id}`);
};

export { getAllNation, postCreateNation, deleteNation, patchUpdateNation };
