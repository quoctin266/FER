import "./About.scss";
import Accordion from "react-bootstrap/Accordion";
import { HiUsers } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
import { BiNews } from "react-icons/bi";
import { Button } from "@mui/material";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { postUploadChunk } from "../../service/fileService";

const About = () => {
  const [file, setFile] = useState(null);

  const handleChangeFile = (file) => {
    console.log(file);
    setFile(file);
  };

  const handleUpload = async () => {
    if (file) {
      // let res = await postUploadFile(file, "video", "demo");
      // if (res.status === 201) toast.success(res.message);

      const CHUNK_SIZE = 1000 * 1000 * 50;
      const totalChunks =
        file.size % CHUNK_SIZE === 0
          ? file.size / CHUNK_SIZE
          : Math.floor(file.size / CHUNK_SIZE) + 1;

      const fileName = file.name;

      await Promise.all(
        Array.apply(null, Array(totalChunks)).map(async (item, index) => {
          const CHUNK = file.slice(
            index * CHUNK_SIZE,
            (index + 1) * CHUNK_SIZE
          );

          return postUploadChunk(CHUNK, fileName, totalChunks);
        })
      );
    } else toast.error("no file chosen");
  };

  return (
    <div className="about-container">
      <Form.Control
        className="mb-3"
        type="file"
        onChange={(e) => handleChangeFile(e.target.files[0])}
      />
      <Button
        className="mb-3"
        variant="contained"
        onClick={() => handleUpload()}
      >
        Upload
      </Button>

      <Accordion defaultActiveKey={["0"]} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <HiUsers /> &nbsp; THE TEAM
          </Accordion.Header>
          <Accordion.Body>abc</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <MdLocationOn /> &nbsp; Nations
          </Accordion.Header>
          <Accordion.Body>acb</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <BiNews /> &nbsp; Daily news
          </Accordion.Header>
          <Accordion.Body>abc</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default About;
