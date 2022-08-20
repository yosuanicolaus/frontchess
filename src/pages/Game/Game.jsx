import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../../helper/socket";
import LoadingPage from "../../components/LoadingPage";
import { useAuth } from "../../helper/auth";
// TODO: set what user can control with auth

function Game() {
  const { id } = useParams();
  const { user } = useAuth();
  const { uid } = user;
  const [gameDB, setGameDB] = useState(null);
  const [chess, setChess] = useState(null);

  useEffect(() => {
    if (!id || !uid) return;
    socket.emit("join", { id, uid });

    socket.on("update-game", (game) => {
      console.log("updating gameDB state");
      setGameDB(game);
    });

    socket.on("update-chess", (chess) => {
      console.log("updating chess state");
      setChess(chess);
    });

    socket.on("error", (message) => {
      console.log(message);
    });

    return () => {
      console.log("leaving, turning off socket listener");
      socket.emit("leave", { id, uid });
      socket.off("update-game");
      socket.off("update-chess");
      socket.off("log");
    };
  }, [id, uid]);

  if (!gameDB) return <LoadingPage text={"fetching game from DB..."} />;

  return (
    <main>
      <h1>Hello! this is game room</h1>
      <div>Game ID: {id}</div>
      {gameDB && <div>{JSON.stringify(gameDB)}</div>}
      <hr />
      {chess && <div>{JSON.stringify(chess.getMoves())}</div>}
    </main>
  );
}

export default Game;
