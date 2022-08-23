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

    socket.on("update-game", (game) => {
      console.log("updating game state");
      setGame(game);
    });

    return () => {
      socket.off("update-game");
    };
  }, [id, socket]);

  if (!game)
    return <LoadingPage text={"gameprovider: fetching game from DB..."} />;

  return (
    <GameContext.Provider value={{ game }}>{children}</GameContext.Provider>
  );
}
