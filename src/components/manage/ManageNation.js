import { Button, Col, Form, Modal, Table } from "react-bootstrap";
import "./ManageNation.scss";
import {
  getAllNation,
  postCreateNation,
  deleteNation,
} from "../../service/nationService";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import EditNation from "./EditNation";

const ManageNation = () => {
  const [nationList, setNationList] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  const [showDelete, setShowDelete] = useState(false);
  const [deletingNation, setDeletingNation] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleCloseAdd = () => {
    setShowAdd(false);
  };
  const handleShowAdd = () => {
    reset();
    setShowAdd(true);
  };

  const handleAdd = async (data) => {
    let res = await postCreateNation(data);
    if (res.status === 200) {
      fetchAllNation();
      toast.success(res.message);
      handleCloseAdd();
    } else toast.error(res.error);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
  };
  const handleShowDelete = (nation) => {
    setShowDelete(true);
    setDeletingNation(nation);
  };

  const handleDelete = async () => {
    let res = await deleteNation(deletingNation._id);
    if (res && res.status === 200) {
      toast.success(res.message);
      handleCloseDelete();
      fetchAllNation();
    } else toast.error(res.error);
  };

  const fetchAllNation = async () => {
    let res = await getAllNation();
    if (res?.status === 200) {
      setNationList(res.data);
    } else toast.error(res.error);
  };

  useEffect(() => {
    fetchAllNation();
  }, []);

  return (
    <div className="manage-nation-container">
      <div className="title">Manage Nations</div>
      <div className="list-nation">
        <Button variant="primary" className="mb-3" onClick={handleShowAdd}>
          Add new
        </Button>
        <Table striped hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {nationList &&
              nationList.length > 0 &&
              nationList.map((nation, index) => {
                return (
                  <tr key={nation._id}>
                    <td>{index + 1}</td>
                    <td>{nation.name}</td>
                    <td style={{ width: "60%" }}>{nation.description}</td>
                    <td>
                      <Button
                        variant="danger"
                        className="me-2"
                        onClick={() => handleShowDelete(nation)}
                      >
                        Delete
                      </Button>
                      <EditNation
                        nation={nation}
                        fetchAllNation={fetchAllNation}
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
            <Modal.Body className="px-5">
              <Col className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter nation name"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <div style={{ color: "red" }}>{errors.name.message}</div>
                )}
              </Col>

              <Col className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
                {errors.description && (
                  <div style={{ color: "red" }}>
                    {errors.description.message}
                  </div>
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

        {/* <Modal
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
                  <b>Nation: </b> {detailPlayer.nation?.name}
                </div>
                <div className="des">
                  <b>Goals: </b> {detailPlayer.goals}
                </div>
                <div className="des">
                  <b>Club: </b>
                  {detailPlayer.club}
                </div>
                <div>
                  <b>Info:</b>
                </div>
                <div className="des">{detailPlayer.info}</div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal> */}

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
            Are you sure to delete this nation? <br />
            Name: <b>{deletingNation?.name}</b> <br />
            Description: <b>{deletingNation?.description}</b> <br />
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

export default ManageNation;
