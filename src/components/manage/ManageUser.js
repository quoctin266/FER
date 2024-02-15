import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import "./ManageNation.scss";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "./ManageUser.scss";
import { IconButton, Switch } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getUsers, patchUpdateUser } from "../../service/authService";
import moment from "moment";

const ManageUser = () => {
  const [userList, setUserList] = useState([]);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);

  const fetchAllUser = async () => {
    let res = await getUsers();
    if (res?.status === 200) {
      setUserList(res.data.items);
    } else toast.error(res.error);
  };

  const handleChange = async (event, userId) => {
    let res = await patchUpdateUser({ status: event.target.checked }, userId);
    if (res.status === 200) {
      fetchAllUser();
      toast.success(res.message);
    } else toast.error(res.error);
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  return (
    <div className="manage-user-container">
      <div className="title">Manage Users</div>
      <div className="list-user">
        <Table striped hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {userList &&
              userList.length > 0 &&
              userList.map((user, index) => {
                return (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <Switch
                        checked={user.status ? true : false}
                        onChange={(e) => handleChange(e, user._id)}
                      />
                    </td>
                    <td>
                      <IconButton
                        onClick={() => {
                          setUser(user);
                          setShow(true);
                        }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Detail Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Col>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                readOnly
                value={user?.username ? user.username : ""}
              />
            </Col>
            <Col>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                readOnly
                value={user?.email ? user.email : ""}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                readOnly
                value={user?.firstName ? user.firstName : ""}
              />
            </Col>
            <Col>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                readOnly
                value={user?.lastName ? user.lastName : ""}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                readOnly
                value={user?.phone ? user.phone : ""}
              />
            </Col>
            <Col>
              <Form.Label>Date Of Birth</Form.Label>
              <Form.Control
                type="date"
                readOnly
                value={user?.dob ? moment(user.dob).format("YYYY-MM-DD") : ""}
              />
            </Col>
          </Row>

          <Col>
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              readOnly
              rows={4}
              value={user?.address ? user.address : ""}
            />
          </Col>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageUser;
