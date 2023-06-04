import { Players } from "../shared/ListOfPlayers";
import { Films } from "../shared/ListOfFilms";
import Player from "./Player/Player";
import Film from "./Films/Film";

const Main = () => {
  return (
    <>
      {/* <Player Players={Players} /> */}
      <Film Films={Films} />
    </>
  );
};

export default Main;
