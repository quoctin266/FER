import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "./Films.scss";
import { Container } from "react-bootstrap";
import { Films } from "../../shared/ListOfFilms";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";

export default function Film(props) {
  const [selected, setSelected] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (film) => {
    setSelected(film);
    setShow(true);
  };
  const listFilms = Films;

  return (
    <Container>
      <div className="film-container">
        {listFilms &&
          listFilms.length > 0 &&
          listFilms.map((film) => {
            return (
              <div className="film" key={film.id}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={film.img} />
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item className="name">
                      {film.title}
                    </ListGroup.Item>
                    <ListGroup.Item className="team">
                      {film.year}
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="detail"
                      onClick={() => handleShow(film)}
                    >
                      Detail
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </div>
            );
          })}
      </div>
      <Modal show={show} onHide={handleClose} className="film-modal">
        <Modal.Header closeButton>
          <img src={selected.img} alt="preview" />
        </Modal.Header>
        <Modal.Body>
          <Modal.Title>Title: {selected.title}</Modal.Title>
          <div className="detail">
            Publish: {selected.year} &nbsp; &nbsp; &nbsp; Nation:{" "}
            {selected.nation}
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
