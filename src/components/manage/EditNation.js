import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { patchUpdateNation } from "../../service/nationService";

const EditNation = (props) => {
  const { nation } = props;

  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return {
        name: nation.name,
        description: nation.description,
      };
    }, [nation]),
  });

  const handleClose = async () => {
    setShow(false);
    reset();
  };
  const handleShow = () => {
    setShow(true);
  };

  const handleEdit = async (data) => {
    let res = await patchUpdateNation(data, nation._id);

    if (res.status === 200) {
      toast.success(res.message);
      props.fetchAllNation();
      setShow(false);
    } else toast.error(res.error);
  };

  useEffect(() => {
    reset({
      name: nation.name,
      description: nation.description,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nation]);

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
                <div style={{ color: "red" }}>{errors.description.message}</div>
              )}
            </Col>
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

export default EditNation;
