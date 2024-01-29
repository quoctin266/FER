import { Button, ButtonGroup } from "react-bootstrap";
import "./Dashboard.scss";
import { useState } from "react";
import ManagePlayer from "./ManagePlayer";
import ManageNation from "./ManageNation";

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
          Players
        </Button>
        <Button
          variant="primary"
          className={`nation-tab ${activeTab === "nation" ? "active" : ""}`}
          onClick={() => setActiveTab("nation")}
        >
          Nations
        </Button>
      </ButtonGroup>

      {activeTab === "player" && <ManagePlayer />}
      {activeTab === "nation" && <ManageNation />}
    </div>
  );
};

export default Dashboard;
