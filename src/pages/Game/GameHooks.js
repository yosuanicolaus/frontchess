import React, { useState, useEffect, createContext, useContext } from "react";
import LoadingPage from "../../components/LoadingPage";
import { useSocket } from "../../helper/socket";

const GameContext = createContext();

export function useGameDB() {
  return useContext(GameContext);
}

export function GameProvider({ id, children }) {
  const [game, setGame] = useState();
  const socket = useSocket(id);

  useEffect(() => {
    if (!id || !socket) return;
    socket.emit("join-game", { id });

    socket.on("update-game", (game) => {
      console.log("updating game state");
      setGame(game);
    });

    return () => {
      socket.emit("leave-game", { id });
      socket.off("update-game");
    };
  }, [id, socket]);

  const value = {
    game,

    toggleReady: function () {
      socket.emit("toggle", { id });
    },

    startGame: function () {
      socket.emit("start", { id });
    },
  };

  if (!game) return <LoadingPage text={"Fetching game from DB..."} />;

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
