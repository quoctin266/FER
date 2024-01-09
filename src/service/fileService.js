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

const removeFile = async (fileName) => {
  return await axios.delete("files", { headers: { fileName } });
};

export { postUploadFile, removeFile };
