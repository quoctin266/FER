import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { login } from "../../redux/action/auth";
import { toast } from "react-toastify";
import { loginGoogle, postLogin } from "../../service/authService";
import { Col } from "react-bootstrap";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLoginGoogle = async (credentialResponse) => {
    if (credentialResponse) {
      const credentialResponseDecode = jwtDecode(credentialResponse.credential);

      let res = await loginGoogle({
        username: credentialResponseDecode.name,
        email: credentialResponseDecode.email,
        firstName: credentialResponseDecode.given_name,
        lastName: credentialResponseDecode.family_name,
      });

      if (res.status === 200) {
        dispatch(
          login({
            name: credentialResponseDecode.name,
            email: credentialResponseDecode.email,
            img: credentialResponseDecode.picture,
            role: res.data.userCredentials.role,
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
          })
        );

        navigate("/");
        toast.success("Login successfully");
      } else toast.error(res.message);
    }
  };

  const handleLogin = async (data) => {
    let res = await postLogin(data);
    if (res.status === 200) {
      dispatch(
        login({
          name: res.data.userCredentials.username,
          email: res.data.userCredentials.email,
          img: "",
          role: res.data.userCredentials.role,
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
        })
      );
      navigate("/");
      toast.success(res.message);
    } else toast.error(res.error);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Col xs={10} sm={7} md={6} lg={4} xxl={3}>
        <GoogleOAuthProvider clientId="929153793805-ajauhckm4tj809q2v0lj1po4gg2b42nf.apps.googleusercontent.com">
          <Form className="login-form p-5" onSubmit={handleSubmit(handleLogin)}>
            <div className="title">Login Now</div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <div style={{ color: "red" }}>{errors.email.message}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <div style={{ color: "red" }}>{errors.password.message}</div>
              )}
            </Form.Group>
            <Button variant="dark" type="submit" className="mb-3 login-btn">
              Login
            </Button>
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
      </Col>
    </div>
  );
};

export default Login;
