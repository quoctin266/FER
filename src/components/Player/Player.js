import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "./Player.scss";
import { Container } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { getAllPlayer } from "../../service/playerService";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Player = (props) => {
  const [listPlayers, setListPlayers] = useState([]);
  const [preview, setPreview] = useState({});
  const [show, setShow] = useState(false);

  const fetchPlayers = async () => {
    let res = await getAllPlayer();
    if (res.status === 200) setListPlayers(res.data);
    else toast.error(res.error);
  };

  const handleClose = () => setShow(false);
  const handleShow = (player) => {
    setPreview(player);
    setShow(true);
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <Container>
      <div className="player-container">
        {listPlayers &&
          listPlayers.length > 0 &&
          listPlayers.map((player) => {
            return (
              <div className="player" key={player._id}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={player.imageUrl} />
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item className="name">
                      {player.name}
                    </ListGroup.Item>
                    <ListGroup.Item className="team">
                      {player.club}
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="detail"
                      onClick={() => handleShow(player)}
                    >
                      Detail
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </div>
            );
          })}
      </div>
      <Modal show={show} onHide={handleClose} className="player-modal">
        <Modal.Header closeButton>
          <img src={preview.imageUrl} alt="player-preview" />
        </Modal.Header>
        <Modal.Body>
          <Modal.Title>{preview.name}</Modal.Title>
          {preview.info}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Player;
