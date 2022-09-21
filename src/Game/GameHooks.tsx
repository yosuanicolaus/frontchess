import React, { useState, useEffect, createContext, useContext } from "react";
import LoadingPage from "../components/LoadingPage";
import { useAuth } from "../helper/auth";
import { useSocket } from "../helper/socket";
import { Game, Move } from "../helper/types";

interface GameContextInterface {
  game: Game;
  myTurn: boolean;
  toggleReady: () => void;
  startGame: () => void;
  playMove: (move: Move) => void;
}

const GameContext = createContext<GameContextInterface>(
  {} as GameContextInterface
);

export function useGameDB() {
  return useContext(GameContext);
}

interface GameProviderProps {
  id: string;
  children: JSX.Element;
}

export function GameProvider({ id, children }: GameProviderProps) {
  const { uid } = useAuth();
  const [game, setGame] = useState<Game | null>(null);
  const socket = useSocket(id);
  const myTurn =
    (uid === game?.pwhite?.uid && game.turn === "w") ||
    (uid === game?.pblack?.uid && game.turn === "b");

  useEffect(() => {
    if (!id || !socket) return;
    socket.emit("join-game", { id });

    socket.on("update-game", (game: Game, lastMove: Move) => {
      console.log("updating game state");
      setGame(game);
      console.log(lastMove);
    });

    return () => {
      socket.emit("leave-game", { id });
      socket.off("update-game");
    };
  }, [id, socket]);

  if (!game) return <LoadingPage text={"Fetching game from DB..."} />;

  const value = {
    game,
    myTurn,
    toggleReady: function () {
      socket.emit("toggle", { id });
    },
    startGame: function () {
      socket.emit("start", { id });
    },
    playMove: function (move: Move) {
      socket.emit("play", { id, move });
    },
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
