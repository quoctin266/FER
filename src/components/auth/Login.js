import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const handleLogin = async () => {
    let res = await axios.post("http://localhost:8080/login", {
      name: name,
      email: email,
    });
    console.log("check res", res);
  };

  return (
    <>
      <Form className="login-form">
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

        <Button variant="light" onClick={() => navigate("/")}>
          Back
        </Button>
        <Button
          variant="primary"
          type="button"
          onClick={handleLogin}
          className="mx-2"
        >
          Login
        </Button>
      </Form>
    </>
  );
};

export default Login;
