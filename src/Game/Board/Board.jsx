import { useState, useEffect, createContext, useContext } from "react";
import { useAuth } from "../../helper/auth";
import { useGameDB } from "../GameHooks";
import BackPanels from "./BackPanels";
import FrontPanels from "./FrontPanels";
import Pieces from "./Pieces";

const BoardContext = createContext();
export const useBoard = () => useContext(BoardContext);

function Board({ size }) {
  const { uid } = useAuth();
  const { game, playMove } = useGameDB();
  const positions = createPositions(size);
  const [flipped, setFlipped] = useState(uid === game.pblack.uid);
  const [panels, setPanels] = useState(defaultPanels);
  const [activePiece, setActivePiece] = useState({});
  const [activeMoves, setActiveMoves] = useState([]);

  const getMovesFromRankFile = (rank, file) => {
    if (activePiece.rank === rank && activePiece.file === file) {
      return removeFocus();
    }

    setActivePiece({ rank, file });
    if (
      (game.turn === "w" && game.pwhite.uid === uid) ||
      (game.turn === "b" && game.pblack.uid === uid)
    ) {
      const moves = game.moves.filter(
        (move) => move.from.rank === rank && move.from.file === file
      );
      setActiveMoves(moves);
      configurePanels(moves, rank, file);
    }
  };

  const configurePanels = (moves, activeRank, activeFile) => {
    const copyPanels = createBoardPanels(game.board);

    moves.forEach((move) => {
      const { rank, file } = move.to;
      if (move.capture) {
        copyPanels[rank][file] = 3;
      } else {
        copyPanels[rank][file] = 2;
      }
    });

    if (activeRank >= 0) copyPanels[activeRank][activeFile] = 11;
    setPanels(copyPanels);
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
    setPanels(createBoardPanels(game.board));
  };

  useEffect(() => {
    setPanels(createBoardPanels(game.board));
  }, [game.board]);

  useEffect(() => {
    document.onkeydown = (e) => {
      if (e.key === "f") {
        setFlipped((value) => !value);
        console.log("flip board");
      }
    };
  }, []);

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
          flipped,
          size,
          panels,
          activeMoves,
          activePiece,
          getMovesFromRankFile,
          removeFocus,
          playRankFile,
        }}
      >
        <BackPanels />
        <Pieces />
        <FrontPanels />
      </BoardContext.Provider>
    </main>
  );
}

const defaultPanels = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

const createBoardPanels = (board) => {
  const copyPanels = defaultPanels.map((arr) => arr.slice());

  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      if (board[rank][file] === ".") continue;
      copyPanels[rank][file] = 1;
    }
  }
  return copyPanels;
};

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
