import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";

function Game() {
  const { id } = useParams();

  return (
    <>
      <Navbar />
      <h1>Hello! this is game room</h1>
      <div>Game ID: {id}</div>
    </>
  );
}

export default Game;
