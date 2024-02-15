import { Button, ButtonGroup } from "react-bootstrap";
import "./Profile.scss";
import { useState } from "react";
import Account from "./Account";
import ChangePassword from "./ChangePassword";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="profile">
      <ButtonGroup className="btn-tab">
        <Button
          variant="primary"
          className={`account-tab ${activeTab === "account" ? "active" : ""}`}
          onClick={() => setActiveTab("account")}
        >
          Account
        </Button>
        <Button
          variant="primary"
          className={`password-tab ${activeTab === "password" ? "active" : ""}`}
          onClick={() => setActiveTab("password")}
        >
          Change Password
        </Button>
      </ButtonGroup>

      {activeTab === "account" && <Account />}
      {activeTab === "password" && <ChangePassword />}
    </div>
  );
};

export default Profile;
