import "./Contact.scss";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useFormik } from "formik";
import * as Yup from "yup";

const Contact = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      content: "",
      nation: "",
    },
    onSubmit: (values) => {
      console.log(values);
      alert(JSON.stringify(formik.values));
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required.")
        .min(5, "Must be 5 characters or more"),
      email: Yup.string().required("Required.").email("Invalid email"),
      phone: Yup.string().required("Required."),
      nation: Yup.number().required("Please select a nation.").integer(),
      content: Yup.string()
        .required("Required.")
        .min(10, "Must be 10 characters or more"),
    }),
  });

  return (
    <div className="contact-container">
      <div className="title">Contact us</div>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Your name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name && (
            <div style={{ color: "red" }}>{formik.errors.name}</div>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Your phone</Form.Label>
          <Form.Control
            type="number"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
          {formik.errors.phone && (
            <div style={{ color: "red" }}>{formik.errors.phone}</div>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
          {formik.errors.email && (
            <div style={{ color: "red" }}>{formik.errors.email}</div>
          )}
        </Form.Group>
        <Row className="mb-3">
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
            as={Col}
          >
            <Form.Label>Your content</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="content"
              value={formik.values.content}
              onChange={formik.handleChange}
            />
            {formik.errors.content && (
              <div style={{ color: "red" }}>{formik.errors.content}</div>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicSelect" as={Col}>
            <Form.Label>Choose your favorite nation</Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="nation"
              value={formik.values.nation}
              onChange={formik.handleChange}
            >
              <option value="">Select...</option>
              <option value={1}>USA</option>
              <option value={2}>Japan</option>
              <option value={3}>Viet Nam</option>
            </Form.Select>
            {formik.errors.nation && (
              <div style={{ color: "red" }}>{formik.errors.nation}</div>
            )}
          </Form.Group>
        </Row>

        <Button variant="warning" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Contact;
