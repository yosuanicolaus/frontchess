import { useParams } from "react-router-dom";

function Game() {
  const { id } = useParams();

  return (
    <>
      <h1>Hello! this is game room</h1>
      <div>Game ID: {id}</div>
    </>
  );
}

export default Game;
