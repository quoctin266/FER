import axios from "../utils/axiosCustomize";

const postUploadFile = async (file, folder_type, folder_name) => {
  const payload = new FormData();
  payload.append("file", file);
  return await axios.post("files", payload, {
    headers: {
      folder_type,
      folder_name,
    },
  });
};

const postUploadChunk = async (chunk, fileName, totalChunks) => {
  const payload = new FormData();
  payload.append("chunk", chunk);
  payload.append("fileName", fileName);
  payload.append("totalChunks", totalChunks);

  return await axios.post("/files/chunk", payload);
};

const removeFile = async (fileName) => {
  return await axios.delete("files", { headers: { fileName } });
};

export { postUploadFile, removeFile, postUploadChunk };
