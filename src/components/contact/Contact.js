import "./Contact.scss";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="title">Contact us</div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Your name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Your phone</Form.Label>
          <Form.Control
            type="tel"
            placeholder="123-45-678"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Row className="mb-3">
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
            as={Col}
          >
            <Form.Label>Your content</Form.Label>
            <Form.Control as="textarea" rows={4} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicSelect" as={Col}>
            <Form.Label>Choose your favorite nation</Form.Label>
            <Form.Select aria-label="Default select example">
              <option value="1">USA</option>
              <option value="2">Japan</option>
              <option value="3">Viet Nam</option>
            </Form.Select>
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
