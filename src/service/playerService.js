import axios from "../utils/axiosCustomize";

const getAllPlayer = async (name) => {
  return await axios.get(`players?${name ? `name=${name}&` : ""}`);
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

const postCreateComment = async (data) => {
  return await axios.post("comments", data);
};

const getAllComments = async (player) => {
  return await axios.get(`comments?${player ? `player=${player}&` : ""}`);
};

const deleteComment = async (id) => {
  return await axios.delete(`comments/${id}`);
};

const patchUpdateComment = async (id, data) => {
  return await axios.patch(`comments/${id}`, data);
};

export {
  getAllPlayer,
  postCreatePlayer,
  patchUpdatePlayer,
  getPlayerDetail,
  deletePlayer,
  postCreateComment,
  getAllComments,
  deleteComment,
  patchUpdateComment,
};
