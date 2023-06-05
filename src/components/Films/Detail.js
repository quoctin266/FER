import { useLocation } from "react-router-dom/dist";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Detail.scss";

const Detail = () => {
  const location = useLocation();
  const film = location.state.detail;
  return (
    <div className="detail-container">
      <Card className="film-card">
        <Card.Img variant="top" src={film.img} />
        <Card.Body>
          <Card.Title>{film.title}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Detail;
