import "./About.scss";
import Accordion from "react-bootstrap/Accordion";
import { HiUsers } from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
import { BiNews } from "react-icons/bi";

const About = () => {
  return (
    <div className="about-container">
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
