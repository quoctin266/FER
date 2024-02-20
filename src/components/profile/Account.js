import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { patchUpdateUser } from "../../service/authService";
import { update } from "../../redux/action/auth";
import { toast } from "react-toastify";

const Account = () => {
  const { firstName, lastName, name, phone, dob, address, id } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: firstName,
      lastName: lastName,
      username: name,
      phone: phone,
      dob: dob ? moment(dob).format("YYYY-MM-DD") : "",
      address: address,
    },
  });

  const handleUpdateInfo = async (data) => {
    let payload = {
      ...data,
      dob: moment(data.dob, "YYYY-MM-DD").toISOString(),
    };

    let res = await patchUpdateUser(payload, id);
    if (res.status === 200) {
      dispatch(update({ ...payload, name: payload.username }));
      toast.success("Updated successfully.");
    } else toast.error(res.error);
  };

  return (
    <div className="account">
      <div className="title">Basic Profile</div>
      <div className="description">Add information about yourself</div>

      <form className="col-6" onSubmit={handleSubmit(handleUpdateInfo)}>
        <Row className="mb-4 flex-column flex-sm-row">
          <Col className="mb-4 mb-sm-0">
            <Form.Control
              type="text"
              {...register("firstName", {
                required: "First name is required",
                maxLength: { value: 64, message: "Exceeded Max Length" },
              })}
            />
            <div className="label">First name.</div>
            {errors.firstName && (
              <span style={{ color: "red" }}>{errors.firstName.message}</span>
            )}
          </Col>

          <Col>
            <Form.Control
              type="text"
              {...register("lastName", {
                required: "Last name is required",
                maxLength: { value: 256, message: "Exceeded Max Length" },
              })}
            />
            <div className="label">Last name.</div>
            {errors.lastName && (
              <span style={{ color: "red" }}>{errors.lastName.message}</span>
            )}
          </Col>
        </Row>

        <Col xs={12} sm={6} className="mb-4">
          <Form.Control
            type="text"
            {...register("username", {
              required: "Username is required",
              maxLength: { value: 64, message: "Exceeded Max Length" },
            })}
          />
          <div className="label">Username.</div>
          {errors.username && (
            <span style={{ color: "red" }}>{errors.username.message}</span>
          )}
        </Col>

        <Col xs={12} sm={6} className="mb-4">
          <Form.Control
            type="text"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/i,
                message: "Invalid phone number",
              },
            })}
          />
          <div className="label">Phone number.</div>
          {errors.phone && (
            <span style={{ color: "red" }}>{errors.phone.message}</span>
          )}
        </Col>

        <Col xs={12} sm={6} className="mb-4">
          <Form.Control type="date" {...register("dob")} />
          <div className="label">Date of birth.</div>
        </Col>

        <Col className="mb-5">
          <Form.Control
            as="textarea"
            rows={4}
            {...register("address", {
              maxLength: { value: 256, message: "Exceeded Max Length" },
            })}
          />
          <div className="label">Your address here.</div>
          {errors.address && (
            <span style={{ color: "red" }}>{errors.address.message}</span>
          )}
        </Col>

        <Button type="submit">Save changes</Button>
      </form>
    </div>
  );
};

export default Account;
