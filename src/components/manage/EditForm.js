import { toast } from "react-toastify";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
import { useState } from "react";

const EditForm = (props) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [club, setClub] = useState("");
  const [famous, setFamous] = useState("");
  const [nation, setNation] = useState("");
  const [info, setInfo] = useState("");
  const [invalidName, setInvalidName] = useState(false);
  const [invalidCost, setInvalidCost] = useState(false);
  const [invalidClub, setInvalidClub] = useState(false);
  const [invalidNation, setInvalidNation] = useState(false);
  const [invalidInfo, setInvalidInfo] = useState(false);

  const { player } = props;

  const handleClose = () => {
    setInvalidClub(false);
    setInvalidCost(false);
    setInvalidInfo(false);
    setInvalidName(false);
    setInvalidNation(false);
    setShow(false);
  };
  const handleShow = () => {
    setClub(player.club);
    setCost(player.cost);
    setFamous(player.famous ? 1 : 0);
    setInfo(player.info);
    setName(player.name);
    setNation(player.nation);
    setShow(true);
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    if (!name) {
      setInvalidName(true);
      return;
    }

    if (!club) {
      setInvalidClub(true);
      return;
    }

    if (!cost) {
      setInvalidCost(true);
      return;
    }

    if (!info) {
      setInvalidInfo(true);
      return;
    }

    if (!nation) {
      setInvalidNation(true);
      return;
    }

    try {
      let res = await axios.put(
        `https://6497076483d4c69925a3560d.mockapi.io/api/v1/demoAPI/${player.id}`,
        {
          name: name,
          club: club,
          cost: cost,
          info: info,
          famous: +famous === 1 ? true : false,
          nation,
        }
      );
      if (res && res.status === 200) {
        toast.success("Updated successfully");
        props.fetchAllPlayer();
        handleClose();
      } else toast.error("Something went wrong.");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Edit
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Info</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEdit}>
          <Modal.Body>
            <Row className="mb-3">
              <Col>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="editName"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setInvalidName(false);
                  }}
                />
                {invalidName && <div style={{ color: "red" }}>Required</div>}
              </Col>

              <Col>
                <Form.Label>Cost</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter cost"
                  min={0}
                  name="editCost"
                  value={cost}
                  onChange={(e) => {
                    setInvalidCost(false);
                    setCost(e.target.value);
                  }}
                />
                {invalidCost && <div style={{ color: "red" }}>Required</div>}
              </Col>

              <Col>
                <Form.Label>Club</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter club"
                  name="editClub"
                  value={club}
                  onChange={(e) => {
                    setClub(e.target.value);
                    setInvalidClub(false);
                  }}
                />
                {invalidClub && <div style={{ color: "red" }}>Required</div>}
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Label>Famous</Form.Label>
                <Form.Select
                  name="editFamous"
                  value={famous}
                  onChange={(e) => setFamous(e.target.value)}
                >
                  <option value={1}>Yes</option>
                  <option value={0}>No</option>
                </Form.Select>
              </Col>

              <Col>
                <Form.Label>Nation</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter nation"
                  name="editNation"
                  value={nation}
                  onChange={(e) => {
                    setInvalidNation(false);
                    setNation(e.target.value);
                  }}
                />
                {invalidNation && <div style={{ color: "red" }}>Required</div>}
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Label>Info</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="editInfo"
                  value={info}
                  onChange={(e) => {
                    setInvalidInfo(false);
                    setInfo(e.target.value);
                  }}
                />
                {invalidInfo && <div style={{ color: "red" }}>Required</div>}
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Confirm
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default EditForm;
