import { Button, CircularProgress, IconButton, Rating } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { deleteComment } from "../../service/playerService";

const DeleteComment = (props) => {
  const { item, fetchComments } = props;
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeleteComment = async () => {
    setLoading(true);
    let res = await deleteComment(item._id);
    if (res.status === 200) {
      fetchComments();
      toast.success("Delete successfully.");
      handleClose();
    } else toast.error(res.error);
    setLoading(false);
  };

  return (
    <>
      <IconButton className="p-0" onClick={handleShow}>
        <DeleteIcon />
      </IconButton>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this comment?
          <Row className="my-3">
            <Col xs={3}>
              <b>Comment:</b>
            </Col>
            <Col xs={9}>{item.comment}</Col>
          </Row>
          <Row className="mb-3">
            <Col xs={3}>
              <b>Rating:</b>
            </Col>
            <Col xs={9}>
              <Rating name="read-only" value={item.rating} readOnly />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outlined"
            className="mx-2"
            onClick={handleClose}
            disabled={loading}
          >
            Close
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteComment}
            disabled={loading}
          >
            {loading && (
              <CircularProgress size={15} color="inherit" className="me-2" />
            )}
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteComment;
