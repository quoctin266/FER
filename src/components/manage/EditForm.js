import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { postUploadFile } from "../../service/fileService";
import { patchUpdatePlayer } from "../../service/playerService";

const FOLDER_TYPE = "image";
const FOLDER_NAME = "players";

const EditForm = (props) => {
  const { player, listNation } = props;

  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return {
        name: player.name,
        club: player.club,
        nation: player.nation?._id,
        goals: player.goals,
        info: player.info,
      };
    }, [player]),
  });

  const handleClose = async () => {
    setShow(false);
    reset();
  };
  const handleShow = () => {
    setShow(true);
  };

  const handleEdit = async (data) => {
    let img = null;
    if (file) {
      let res = await postUploadFile(file, FOLDER_TYPE, FOLDER_NAME);
      if (res.status === 201) {
        img = res.data.fileName;
      } else toast.error(res.error);
    }

    let res = null;
    if (img) res = await patchUpdatePlayer(player._id, { ...data, img });
    else res = await patchUpdatePlayer(player._id, { ...data });

    if (res.status === 200) {
      toast.success(res.message);
      props.fetchAllPlayer();
      setShow(false);
    } else toast.error(res.error);
  };

  useEffect(() => {
    reset({
      name: player.name,
      club: player.club,
      nation: player.nation?._id,
      goals: player.goals,
      info: player.info,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player]);

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
        <Form onSubmit={handleSubmit(handleEdit)}>
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
                <Form.Label>Club</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter club"
                  {...register("club", { required: "Club is required" })}
                />
                {errors.club && (
                  <div style={{ color: "red" }}>{errors.club.message}</div>
                )}
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Label>Nation</Form.Label>
                <Form.Select
                  {...register("nation", { required: "Nation is required" })}
                >
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
              </Col>

              <Col>
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
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Label>Info</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  {...register("info", {
                    required: "Info is required",
                  })}
                />
                {errors.info && (
                  <div style={{ color: "red" }}>{errors.info.message}</div>
                )}
              </Col>

              <Col>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
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
