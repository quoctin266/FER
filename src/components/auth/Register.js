import "./Register.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { postRegister } from "../../service/authService";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    const { cfnPassword, ...payload } = data;

    let res = await postRegister(payload);
    if (res.status === 200) {
      toast.success(res.message);
      navigate("/login");
    } else toast.error(res.error);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Col xs={10} sm={7} md={6} lg={4} xxl={3}>
        <Form
          className="register-form p-5"
          onSubmit={handleSubmit(handleRegister)}
        >
          <div className="title">Register Now</div>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <div style={{ color: "red" }}>{errors.username.message}</div>
            )}
          </Form.Group>

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

          <Form.Group className="mb-3" controlId="formBasicPW">
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

          <Form.Group className="mb-3" controlId="formBasicCfPW">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              {...register("cfnPassword", {
                required: "Must confirm password",
                validate: (val) => {
                  if (watch("password") !== val) {
                    return "Passwords do no match";
                  }
                },
              })}
            />
            {errors.cfnPassword && (
              <div style={{ color: "red" }}>{errors.cfnPassword.message}</div>
            )}
          </Form.Group>

          <Button variant="dark" type="submit" className="mb-3 register-btn">
            Sign up
          </Button>

          <div className="my-3">
            Already have an account?{" "}
            <span className="login" onClick={() => navigate("/login")}>
              Login now
            </span>
          </div>

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
      </Col>
    </div>
  );
};

export default Register;
