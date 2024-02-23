import { Button, ButtonGroup } from "react-bootstrap";
import "./Dashboard.scss";
import { useState } from "react";
import ManagePlayer from "./ManagePlayer";
import ManageNation from "./ManageNation";
import ManageUser from "./ManageUser";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("player");

  return (
    <div className="dashboard-container">
      <ButtonGroup className="btn-tab">
        <Button
          variant="primary"
          className={`player-tab ${activeTab === "player" ? "active" : ""}`}
          onClick={() => setActiveTab("player")}
        >
          Orchids
        </Button>
        <Button
          variant="primary"
          className={`nation-tab ${activeTab === "nation" ? "active" : ""}`}
          onClick={() => setActiveTab("nation")}
        >
          Categories
        </Button>
        <Button
          variant="primary"
          className={`user-tab ${activeTab === "user" ? "active" : ""}`}
          onClick={() => setActiveTab("user")}
        >
          Users
        </Button>
      </ButtonGroup>

      {activeTab === "player" && <ManagePlayer />}
      {activeTab === "nation" && <ManageNation />}
      {activeTab === "user" && <ManageUser />}
    </div>
  );
};

export default Dashboard;
