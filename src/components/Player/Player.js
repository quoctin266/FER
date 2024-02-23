import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "./Player.scss";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { getAllPlayer } from "../../service/playerService";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Player = () => {
  const [listPlayers, setListPlayers] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    fetchPlayers(searchValue);
  };

  const fetchPlayers = async (name) => {
    let res = await getAllPlayer(name);
    if (res.status === 200) setListPlayers(res.data);
    else toast.error(res.error);
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <Container>
      <form onSubmit={handleSearch}>
        <Row className="justify-content-center">
          <Col xs={6} className="mt-5 mb-3">
            <Form.Control
              type="text"
              placeholder="Search by name"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Col>
        </Row>
      </form>

      <div className="player-container">
        {listPlayers &&
          listPlayers.length > 0 &&
          listPlayers.map((player) => {
            return (
              <div className="player" key={player._id}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src={player.imageUrl}
                    style={{ height: "190px" }}
                  />
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item className="name">
                      {player.name}
                    </ListGroup.Item>
                    <ListGroup.Item className="team" style={{ height: "80px" }}>
                      {player.club}
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="detail"
                      onClick={() => {
                        navigate(`/player-detail/${player._id}`, {
                          state: { detail: player },
                        });
                      }}
                    >
                      Detail
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </div>
            );
          })}
      </div>
    </Container>
  );
};

export default Player;
