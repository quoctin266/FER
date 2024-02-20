import { Button, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { postChangePassword } from "../../service/authService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const { id } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleChangePassword = async (data) => {
    let payload = {
      userId: id,
      newPassword: data.password,
      confirmNewPassword: data.cfnPassword,
    };

    let res = await postChangePassword(payload);
    if (res.status === 200) {
      toast.success("Updated successfully.");
    } else {
      toast.error(res.error);
    }
  };

  return (
    <div className="change-password">
      <Col md={8} lg={6}>
        <form onSubmit={handleSubmit(handleChangePassword)}>
          <h2 className="mb-4">Change Password</h2>

          <Form.Label className="label">New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="New password"
            {...register("password", { required: "Password is required" })}
          />
          <div style={{ color: "red" }}>
            {errors.password && errors.password.message}
          </div>

          <Form.Label className="label mt-4">Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm new password"
            {...register("cfnPassword", {
              required: "Must confirm password",
              validate: (val) => {
                if (watch("password") !== val) {
                  return "Passwords do no match";
                }
              },
            })}
          />
          <div style={{ color: "red" }}>
            {errors.cfnPassword && errors.cfnPassword.message}
          </div>

          <div>
            <Button className="mt-4" type="submit">
              Change Password
            </Button>
          </div>
        </form>
      </Col>
    </div>
  );
};

export default ChangePassword;
