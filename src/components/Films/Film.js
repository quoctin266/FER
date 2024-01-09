import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "./Films.scss";
import { Container } from "react-bootstrap";
import { Films } from "../../shared/ListOfFilms";
import { useNavigate } from "react-router-dom/dist";

export default function Film(props) {
  const listFilms = Films;
  const navigate = useNavigate();

  return (
    <Container>
      <div className="film-container mb-5">
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
                      onClick={() => {
                        navigate(`/detail/${film.id}`, {
                          state: { detail: film },
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
}
