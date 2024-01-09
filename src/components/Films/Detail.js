import { useLocation } from "react-router-dom/dist";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Detail.scss";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

const Detail = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const location = useLocation();
  const film = location.state.detail;
  return (
    <div className="detail-container ps-5 pt-5 mt-5 ms-5 ">
      <Card className="film-card">
        <Card.Img variant="top" src={film.img} />
        <Card.Body>
          <Card.Title className="film-title">{film.title}</Card.Title>
          <Card.Text>
            <div className="year">Release year: {film.year}</div>
            <div className="country">Country of origin: {film.nation}</div>
            <div className="info-title">Storyline</div>
            <div className="info">{film.info}</div>
          </Card.Text>
          <Button variant="warning" onClick={handleShow}>
            Watch trailer
          </Button>
          <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            backdrop="static"
            className="film-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title>Movie Trailer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <iframe
                style={{ width: "100%", height: "60vh", borderRadius: "15px" }}
                src={film.trailer}
                title={film.title}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </Modal.Body>
          </Modal>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Detail;
