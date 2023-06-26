import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import GoogleSignIn from "./GoogleSignIn";

const Login = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  return (
    <>
      <Form className="login-form">
        <div className="title">Login Now</div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Button variant="dark" type="button" className="mb-3 login-btn">
          Login
        </Button>{" "}
        <div className="or">Or connect with social media</div>
        <GoogleSignIn />
        <br />
        <div className="back-btn">
          <span
            onClick={() => {
              navigate("/");
            }}
          >
            &lt;&lt; Go To HomePage
          </span>
        </div>
      </Form>
    </>
  );
};

export default Login;
