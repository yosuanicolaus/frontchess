import { useState, createContext, useContext } from "react";
import { useAuth } from "../../../helper/auth";
import { useGameDB } from "../GameHooks";
import Panels from "./Panels";
import Pieces from "./Pieces";

const BoardContext = createContext();
export const useBoard = () => useContext(BoardContext);

function Board({ size }) {
  const { uid } = useAuth();
  const { game, playMove } = useGameDB();
  const positions = createPositions(size);
  const [activePiece, setActivePiece] = useState({});
  const [activeMoves, setActiveMoves] = useState([]);

  const getMovesFromRankFile = (rank, file) => {
    if (activePiece.rank === rank && activePiece.file === file) {
      setActivePiece({});
      setActiveMoves([]);
      return;
    } else {
      setActivePiece({ rank, file });
    }

    if (
      (game.turn === "w" && game.pwhite.uid === uid) ||
      (game.turn === "b" && game.pblack.uid === uid)
    ) {
      const moves = game.moves.filter(
        (move) => move.from.rank === rank && move.from.file === file
      );
      setActiveMoves(moves);
    }
  };

  const playRankFile = (toRank, toFile) => {
    const move = activeMoves.find(
      (activeMove) =>
        activeMove.to.rank === toRank && activeMove.to.file === toFile
    );
    if (!move) throw new Error("can't find move!");
    playMove(move);
  };

  const removeFocus = () => {
    setActivePiece({});
    setActiveMoves([]);
  };

  return (
    <main
      className="position-relative"
      style={{
        backgroundImage: "url(/boards/blue.svg)",
        width: size,
        height: size,
      }}
    >
      <BoardContext.Provider
        value={{
          positions,
          size,
          activeMoves,
          activePiece,
          getMovesFromRankFile,
          removeFocus,
          playRankFile,
        }}
      >
        <Panels />
        <Pieces />
      </BoardContext.Provider>
    </main>
  );
}

function createPositions(size) {
  const positions = [];

  for (let rank = 0; rank < 8; rank++) {
    positions.push([]);
    for (let file = 0; file < 8; file++) {
      const x = (file / 8) * size;
      const y = (rank / 8) * size;
      positions[rank].push({ x, y });
    }
  }
  return positions;
}

export default Board;
