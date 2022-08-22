import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../../helper/socket";
// import { useAuth } from "../../helper/auth";
import LoadingPage from "../../components/LoadingPage";
import GameBoard from "./GameBoard";
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
    <main className="flex-grow-1 d-flex">
      <div className="container-fluid flex-grow-1 d-flex flex-column">
        <div className="row flex-grow-1">
          <section className="left-board text-bg-dark col d-md-block d-none">
            Game Chat
          </section>
          <GameBoard />
          <section className="right-board text-bg-dark col d-md-block d-none">
            Game Info
          </section>
        </div>

        <div className="row text-bg-secondary text-center d-md-none d-flex">
          <div className="col">Chat</div>
          <div className="col">Info</div>
        </div>

        <div className="row footer text-bg-primary text-center">
          <div className="col">anonym_123 vs john1995</div>
        </div>
      </div>
    </main>
  );
}

export default Game;
