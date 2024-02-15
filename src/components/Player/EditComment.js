import { Button, IconButton, Rating } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { patchUpdateComment } from "../../service/playerService";

const EditComment = (props) => {
  const { item, fetchComments } = props;
  const [show, setShow] = useState(false);
  const [rate, setRate] = useState(item.rating);
  const [invalidRate, setInvalidRate] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      comment: item.comment,
    },
  });

  const handleClose = () => {
    setShow(false);
    reset();
  };

  const handleShow = () => {
    setRate(item.rating);
    setInvalidRate(false);
    setShow(true);
  };

  const onSubmit = async (data) => {
    if (!rate) {
      setInvalidRate(true);
      return;
    }
    let payload = {
      comment: data.comment,
      rating: rate,
      author: item.author?._id,
      player: item.player,
    };

    let res = await patchUpdateComment(item._id, payload);
    if (res.status === 200) {
      fetchComments();
      toast.success("Edit successfully.");
      setShow(false);
    } else toast.error(res.error);
  };

  return (
    <>
      <IconButton className="p-0" onClick={handleShow}>
        <EditIcon />
      </IconButton>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Comment</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Rating
              className="mb-3"
              name="simple-controlled"
              value={rate}
              onChange={(event, newValue) => {
                setRate(newValue);
                setInvalidRate(false);
              }}
            />
            {invalidRate && (
              <div className="mb-3" style={{ color: "red" }}>
                Please give your rate
              </div>
            )}

            <Form.Control
              as="textarea"
              rows={4}
              {...register("comment", {
                required: "Please type something",
                maxLength: { value: 256, message: "Exceeded Max Length" },
              })}
            />
            {errors.comment && (
              <span style={{ color: "red" }}>{errors.comment.message}</span>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outlined" className="mx-2" onClick={handleClose}>
              Close
            </Button>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default EditComment;
