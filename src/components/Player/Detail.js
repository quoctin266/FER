import { useLocation, useNavigate } from "react-router-dom/dist";
import Card from "react-bootstrap/Card";
import "./Detail.scss";
import CommentSection from "./CommentSection";
import { useEffect } from "react";

const PlayerDetail = () => {
  const location = useLocation();
  const player = location.state?.detail;

  const navigate = useNavigate();

  useEffect(() => {
    if (!player) navigate("/");

    // eslint-disable-next-line
  }, []);

  return (
    <div className="detail-container p-5">
      <Card className="film-card">
        <Card.Img variant="top" src={player?.imageUrl} />
        <Card.Body>
          <Card.Title className="film-title">{player?.name}</Card.Title>
          <div>
            <div className="year">Club: {player?.club}</div>
            <div className="country">Nation: {player?.nation?.name}</div>
            <div className="info-title">Biography</div>
            <div className="info">{player?.info}</div>
          </div>
        </Card.Body>
      </Card>

      <CommentSection />
    </div>
  );
};

export default PlayerDetail;
