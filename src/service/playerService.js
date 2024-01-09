import axios from "../utils/axiosCustomize";

const getAllPlayer = async () => {
  return await axios.get("players");
};

const postCreatePlayer = async (data) => {
  return await axios.post("players", data);
};

const getPlayerDetail = async (id) => {
  return await axios.get(`players/${id}`);
};

const deletePlayer = async (id) => {
  return await axios.delete(`players/${id}`);
};

const patchUpdatePlayer = async (id, data) => {
  return await axios.patch(`players/${id}`, data);
};

export {
  getAllPlayer,
  postCreatePlayer,
  patchUpdatePlayer,
  getPlayerDetail,
  deletePlayer,
};
