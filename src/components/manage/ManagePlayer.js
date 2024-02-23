import Table from "react-bootstrap/Table";
import "./ManagePlayer.scss";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";
import EditForm from "./EditForm";
import {
  getAllPlayer,
  postCreatePlayer,
  deletePlayer,
} from "../../service/playerService";
import { useForm } from "react-hook-form";
import { getAllNation } from "../../service/nationService";
import { postUploadFile, removeFile } from "../../service/fileService";
import { Avatar, Card, CardContent, Rating, Switch } from "@mui/material";
import moment from "moment";

const FOLDER_TYPE = "image";
const FOLDER_NAME = "players";

const ManagePlayer = () => {
  const [listPlayer, setListPlayer] = useState([]);
  const [listNation, setListNation] = useState([]);

  const [fileName, setFileName] = useState("");
  const [fileMissing, setFileMissing] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const [show, setShow] = useState(false);
  const [detailPlayer, setDetailPlayer] = useState("");

  const [showDelete, setShowDelete] = useState(false);
  const [deletingPlayer, setDeletingPlayer] = useState("");

  const [checked, setChecked] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nation: "",
    },
  });

  const handleCloseAdd = () => {
    setShowAdd(false);
  };
  const handleShowAdd = () => {
    reset();
    setShowAdd(true);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleUploadFile = async (file) => {
    if (fileName) {
      await removeFile(fileName);
    }

    let res = await postUploadFile(file, FOLDER_TYPE, FOLDER_NAME);
    if (res.status === 201) {
      setFileName(res.data.fileName);
      setFileMissing(false);
      toast.success(res.message);
    } else toast.error(res.error);
  };

  const handleAdd = async (data) => {
    if (!fileName) {
      setFileMissing(true);
      return;
    }
    let res = await postCreatePlayer({ ...data, img: fileName });
    if (res.status === 201) {
      fetchAllPlayer();
      toast.success("Add new successfully");
      setChecked(false);
      handleCloseAdd();
    } else toast.error(res.error);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
  };
  const handleShowDelete = (player) => {
    setShowDelete(true);
    setDeletingPlayer(player);
  };

  const handleDelete = async () => {
    let res = await deletePlayer(deletingPlayer._id);
    if (res && res.status === 200) {
      toast.success("Delete successfully");
      handleCloseDelete();
      fetchAllPlayer();
    } else toast.error(res.error);
  };

  const handleClose = () => setShow(false);
  const handleShow = (player) => {
    setDetailPlayer(player);
    setShow(true);
  };

  const fetchAllNation = async () => {
    let res = await getAllNation();
    if (res?.status === 200) {
      setListNation(res.data);
    } else toast.error(res.error);
  };

  const fetchAllPlayer = async () => {
    let res = await getAllPlayer();
    if (res?.status === 200) {
      setListPlayer(res.data);
    } else toast.error(res.error);
  };

  useEffect(() => {
    fetchAllPlayer();
    fetchAllNation();
  }, []);

  return (
    <div className="manage-player-container">
      <div className="title">Manage Orchids</div>
      <div className="list-player">
        <Button variant="primary" className="mb-3" onClick={handleShowAdd}>
          Add new
        </Button>
        <Table striped hover>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Category</th>
              <th>Origin</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {listPlayer &&
              listPlayer.length > 0 &&
              listPlayer.map((player) => {
                return (
                  <tr key={player._id} style={{ verticalAlign: "middle" }}>
                    <td>
                      <Image src={player.imageUrl} rounded width={100} />
                    </td>
                    <td>{player.name}</td>
                    <td>{player.nation?.name}</td>
                    <td>{player.club ? player.club : "-"}</td>
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
                        listNation={listNation}
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
          <Form onSubmit={handleSubmit(handleAdd)}>
            <Modal.Body>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <div style={{ color: "red" }}>{errors.name.message}</div>
                  )}
                </Col>

                <Col>
                  <Form.Label>Origin</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter origin"
                    {...register("club", { required: "Origin is required" })}
                  />
                  {errors.club && (
                    <div style={{ color: "red" }}>{errors.club.message}</div>
                  )}
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    {...register("nation", {
                      required: "Category is required",
                    })}
                  >
                    <option value="" disabled hidden>
                      Open this select menu
                    </option>
                    {listNation &&
                      listNation.length > 0 &&
                      listNation.map((nation) => {
                        return (
                          <option key={nation._id} value={nation._id}>
                            {nation.name}
                          </option>
                        );
                      })}
                  </Form.Select>
                  {errors.nation && (
                    <div style={{ color: "red" }}>{errors.nation.message}</div>
                  )}
                </Col>

                <Col>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => handleUploadFile(e.target.files[0])}
                  />
                  {fileMissing && (
                    <div style={{ color: "red" }}>No file uploaded yet</div>
                  )}
                </Col>
                {/* <Col>
                  <Form.Label>Goals</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter goals"
                    min={0}
                    {...register("goals", {
                      required: "Goals is required",
                      min: { value: 0, message: "Can not be less than" },
                    })}
                  />
                  {errors.goals && (
                    <div style={{ color: "red" }}>{errors.goals.message}</div>
                  )}
                </Col> */}
              </Row>

              <Row className="mb-3">
                <Col>
                  <div>Is Natural</div>
                  <Switch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </Col>
              </Row>

              <Col>
                <Form.Label>Info</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  {...register("info", {
                    required: "Info is required",
                  })}
                />
                {errors.info && (
                  <div style={{ color: "red" }}>{errors.info.message}</div>
                )}
              </Col>
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
              <Image src={detailPlayer.imageUrl} rounded />
              <div>
                <div className="des">
                  <b>Name: </b> {detailPlayer.name}
                </div>
                <div className="des">
                  <b>Category: </b> {detailPlayer.nation?.name}
                </div>
                <div className="des">
                  <b>Origin: </b>
                  {detailPlayer.club}
                </div>
                <div>
                  <b>Info:</b>
                </div>
                <div className="des">{detailPlayer.info}</div>
              </div>
            </div>

            <div style={{ fontSize: "1.1rem" }}>
              <b>Comments</b>
            </div>
            <div>
              {detailPlayer?.comments?.map((item) => {
                return (
                  <Card key={item._id} className="review-item mt-3">
                    <CardContent>
                      <Row className="align-items-center">
                        <Col xs={1} className="me-4">
                          <Avatar>{item.author?.username?.charAt(0)}</Avatar>
                        </Col>
                        <Col xs={10} className="ms-0">
                          <div className="d-flex align-items-center justify-content-between">
                            <b>{item.author?.username}</b>
                          </div>
                          <div className="time">
                            {moment().diff(moment(item.createdAt), "days") >
                              0 &&
                              `${moment().diff(
                                moment(item.createdAt),
                                "days"
                              )} days ago`}

                            {moment().diff(moment(item.createdAt), "hours") >
                              0 &&
                              moment().diff(moment(item.createdAt), "hours") <
                                24 &&
                              `${moment().diff(
                                moment(item.createdAt),
                                "hours"
                              )} hours ago`}

                            {moment().diff(moment(item.createdAt), "minutes") >
                              0 &&
                              moment().diff(moment(item.createdAt), "minutes") <
                                60 &&
                              `${moment().diff(
                                moment(item.createdAt),
                                "minutes"
                              )} minutes ago`}

                            {moment().diff(moment(item.createdAt), "seconds") >
                              0 &&
                              moment().diff(moment(item.createdAt), "seconds") <
                                60 &&
                              `${moment().diff(
                                moment(item.createdAt),
                                "seconds"
                              )} seconds ago`}
                          </div>
                        </Col>
                      </Row>

                      <Rating
                        className="my-2"
                        name="read-only"
                        value={item.rating}
                        readOnly
                      />

                      <div className="feedback">{item.comment}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
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
            Are you sure to delete this orchid? <br />
            Name: <b>{deletingPlayer.name}</b> <br />
            Origin: <b>{deletingPlayer.club}</b> <br />
            Category: <b>{deletingPlayer.nation?.name}</b>
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
