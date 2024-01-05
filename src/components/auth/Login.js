import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { login } from "../../redux/action/auth";
import { toast } from "react-toastify";
import { loginGoogle } from "../../service/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginGoogle = async (credentialResponse) => {
    if (credentialResponse) {
      const credentialResponseDecode = jwtDecode(credentialResponse.credential);

      let res = await loginGoogle({
        username: credentialResponseDecode.name,
        email: credentialResponseDecode.email,
        firstName: credentialResponseDecode.given_name,
        lastName: credentialResponseDecode.family_name,
      });

      // todo
      if (res.status === 200) {
        dispatch(
          login({
            name: credentialResponseDecode.name,
            email: credentialResponseDecode.email,
            img: credentialResponseDecode.picture,
          })
        );

        navigate("/dashboard");
        toast.success("Login successfully");
      } else toast.error(res.message);
    }
  };

  return (
    <GoogleOAuthProvider clientId="929153793805-ajauhckm4tj809q2v0lj1po4gg2b42nf.apps.googleusercontent.com">
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
        <GoogleLogin
          onSuccess={(credentialResponse) =>
            handleLoginGoogle(credentialResponse)
          }
        />
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
    </GoogleOAuthProvider>
  );
};

export default Login;
