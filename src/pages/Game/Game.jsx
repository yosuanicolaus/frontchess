import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../../helper/socket";
// import { useAuth } from "../../helper/auth";
import LoadingPage from "../../components/LoadingPage";
// TODO: set what user can control with auth

function Game() {
  const { id } = useParams();
  // const { uid } = useAuth();
  const socket = useSocket(id);
  const [gameDB, setGameDB] = useState(null);

  useEffect(() => {
    console.log(`joining game ${id}`);

    socket.on("update-game", (game) => {
      console.log("updating gameDB state");
      setGameDB(game);
    });

    return () => {
      console.log(`leaving game ${id}`);
      socket.off("update-game");
    };
    // eslint-disable-next-line
  }, []);

  if (!gameDB) return <LoadingPage text={"fetching game from DB..."} />;

  return (
    <main>
      <h1>Hello! this is game room</h1>
      <div>Game ID: {id}</div>
      {gameDB && <div>{JSON.stringify(gameDB)}</div>}
      <hr />
    </main>
  );
}

export default Game;
