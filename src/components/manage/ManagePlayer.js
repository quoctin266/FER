import Table from "react-bootstrap/Table";
import "./ManagePlayer.scss";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import EditForm from "./EditForm";

const ManagePlayer = () => {
  const [listPlayer, setListPlayer] = useState([]);
  const [show, setShow] = useState(false);
  const [detailPlayer, setDetailPlayer] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deletePlayer, setDeletePlayer] = useState("");

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      name: "",
      cost: "",
      club: "",
      famous: "",
      nation: "",
      clip: "",
      info: "",
      img: "",
    },
    onSubmit: async (values) => {
      try {
        let res = await axios.post(
          "https://6497076483d4c69925a3560d.mockapi.io/api/v1/demoAPI",
          values
        );
        if (res && res.status === 201) {
          toast.success("Created successfully.");
          fetchAllPlayer();
          handleCloseAdd();
        } else toast.error("Something went wrong.");
      } catch (e) {
        console.log(e);
      }
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required."),
      cost: Yup.number().required("Required."),
      club: Yup.string().required("Required."),
      famous: Yup.boolean().required("Must select."),
      info: Yup.string()
        .required("Required.")
        .min(10, "Must be 10 characters or more"),
      nation: Yup.string().required("Required."),
      clip: Yup.string().required("Required."),
      img: Yup.string().required("Required."),
    }),
  });

  const handleCloseDelete = () => {
    setShowDelete(false);
  };
  const handleShowDelete = (player) => {
    setShowDelete(true);
    setDeletePlayer(player);
  };

  const handleDelete = async () => {
    try {
      let res = await axios.delete(
        `https://6497076483d4c69925a3560d.mockapi.io/api/v1/demoAPI/${deletePlayer.id}`
      );
      if (res && res.status === 200) {
        toast.success("Deleted successfully.");
        handleCloseDelete();
        fetchAllPlayer();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleCloseAdd = () => {
    setShowAdd(false);
    values.name = "";
    values.cost = "";
    values.club = "";
    values.famous = "";
    values.nation = "";
    values.clip = "";
    values.info = "";
    values.img = "";
    errors.cost = "";
    errors.name = "";
    errors.club = "";
    errors.famous = "";
    errors.nation = "";
    errors.clip = "";
    errors.info = "";
    errors.img = "";
  };
  const handleShowAdd = () => setShowAdd(true);

  const handleClose = () => setShow(false);
  const handleShow = (player) => {
    setDetailPlayer(player);
    setShow(true);
  };

  const fetchAllPlayer = async () => {
    try {
      let res = await axios.get(
        "https://6497076483d4c69925a3560d.mockapi.io/api/v1/demoAPI"
      );
      if (res?.data) {
        setListPlayer(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchAllPlayer();
  }, []);

  return (
    <div className="manage-player-container">
      <div className="title">Manage Players</div>
      <div className="list-player">
        <Button variant="primary" className="mb-3" onClick={handleShowAdd}>
          Add new
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Nation</th>
              <th>Club</th>
              <th>Cost</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {listPlayer &&
              listPlayer.length > 0 &&
              listPlayer.map((player) => {
                return (
                  <tr key={player.id}>
                    <td>{player.name}</td>
                    <td>{player.nation}</td>
                    <td>{player.club ? player.club : "-"}</td>
                    <td>{new Intl.NumberFormat().format(player.cost)} $</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleShowDelete(player)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="secondary"
                        className="mx-2"
                        onClick={() => handleShow(player)}
                      >
                        View
                      </Button>
                      <EditForm
                        player={player}
                        fetchAllPlayer={fetchAllPlayer}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>

        <Modal
          show={showAdd}
          onHide={handleCloseAdd}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <div style={{ color: "red" }}>{errors.name}</div>
                  )}
                </Col>

                <Col>
                  <Form.Label>Cost</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter cost"
                    min={0}
                    name="cost"
                    value={values.cost}
                    onChange={handleChange}
                  />
                  {errors.cost && (
                    <div style={{ color: "red" }}>{errors.cost}</div>
                  )}
                </Col>

                <Col>
                  <Form.Label>Club</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter club"
                    name="club"
                    value={values.club}
                    onChange={handleChange}
                  />
                  {errors.club && (
                    <div style={{ color: "red" }}>{errors.club}</div>
                  )}
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Label>Famous</Form.Label>
                  <Form.Select
                    name="famous"
                    value={values.famous}
                    onChange={handleChange}
                  >
                    <option value="">Choose...</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </Form.Select>
                  {errors.famous && (
                    <div style={{ color: "red" }}>{errors.famous}</div>
                  )}
                </Col>

                <Col>
                  <Form.Label>Nation</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter nation"
                    name="nation"
                    value={values.nation}
                    onChange={handleChange}
                  />
                  {errors.nation && (
                    <div style={{ color: "red" }}>{errors.nation}</div>
                  )}
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Label>Clip</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter clip url"
                    name="clip"
                    value={values.clip}
                    onChange={handleChange}
                  />
                  {errors.clip && (
                    <div style={{ color: "red" }}>{errors.clip}</div>
                  )}
                </Col>

                <Col>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    placeholder="Enter image url"
                    type="text"
                    name="img"
                    value={values.img}
                    onChange={handleChange}
                  />
                  {errors.img && (
                    <div style={{ color: "red" }}>{errors.img}</div>
                  )}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Info</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="info"
                    value={values.info}
                    onChange={handleChange}
                  />
                  {errors.info && (
                    <div style={{ color: "red" }}>{errors.info}</div>
                  )}
                </Col>

                <Col></Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAdd}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Confirm
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Detail Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="player-profile">
              <Image src={detailPlayer.img} rounded />
              <div className="des">{detailPlayer.info}</div>
            </div>
            <iframe
              style={{ width: "100%", height: "44vh", borderRadius: "15px" }}
              src={detailPlayer.clip}
              title={detailPlayer.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showDelete}
          onHide={handleCloseDelete}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure to delete this player? <br />
            Name: <b>{deletePlayer.name}</b> <br />
            Club: <b>{deletePlayer.club}</b> <br />
            Nation: <b>{deletePlayer.nation}</b>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDelete}>
              Close
            </Button>
            <Button variant="primary" onClick={handleDelete}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ManagePlayer;
