import { useState, createContext, useContext } from "react";
import { useGameDB } from "../GameHooks";
import Panels from "./Panels";
import Pieces from "./Pieces";

const BoardContext = createContext();
export const useBoard = () => useContext(BoardContext);

function Board({ size }) {
  const { game } = useGameDB();
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

    const moves = game.moves.filter(
      (move) => move.from.rank === rank && move.from.file === file
    );
    setActiveMoves(moves);
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
          getMovesFromRankFile,
          activeMoves,
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
