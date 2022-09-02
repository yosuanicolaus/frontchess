import { useState, useEffect, createContext, useContext } from "react";
import { useAuth } from "../../helper/auth";
import { Move } from "../../helper/types";
import { useGameDB } from "../GameHooks";
import BackPanels from "./BackPanels";
import FrontPanels from "./FrontPanels";
import Pieces from "./Pieces";

export type Positions = { x: number; y: number }[][];

type ActivePiece = { rank: number; file: number };

interface BoardContextInterface {
  positions: Positions;
  flipped: boolean;
  animating: Move | null;
  size: number;
  panels: number[][];
  activeMoves: Move[];
  activePiece: ActivePiece | null;
  getMovesFromRankFile: (rank: number, file: number) => void;
  removeFocus: () => void;
  playRankFile: (toRank: number, toFile: number) => void;
}

const BoardContext = createContext({} as BoardContextInterface);
export const useBoard = () => useContext(BoardContext);

function Board({ size }: { size: number }) {
  const { uid } = useAuth();
  const { game, myTurn, playMove } = useGameDB();
  const positions = createPositions(size);
  const [flipped, setFlipped] = useState(uid === game.pblack?.uid);
  const [animating, setAnimating] = useState<Move | null>(null);
  const [panels, setPanels] = useState(defaultPanels);
  const [activePiece, setActivePiece] = useState<ActivePiece | null>(null);
  const [activeMoves, setActiveMoves] = useState<Move[]>([]);

  const getMovesFromRankFile = (rank: number, file: number) => {
    if (activePiece && activePiece.rank === rank && activePiece.file === file) {
      return removeFocus();
    }

    setActivePiece({ rank, file });
    if (myTurn) {
      const moves = game.moves.filter(
        (move) => move.from.rank === rank && move.from.file === file
      );
      setActiveMoves(moves);
      configurePanels(moves, rank, file);
    }
  };

  const configurePanels = (
    moves: Move[],
    activeRank: number,
    activeFile: number
  ) => {
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

  const playRankFile = (toRank: number, toFile: number) => {
    let move: Move;
    console.log("playing", toRank, toFile);
    const moves = activeMoves.filter(
      (activeMove) =>
        activeMove.to.rank === toRank && activeMove.to.file === toFile
    );
    if (moves.length === 4) {
      // TODO: select 1 out of 4 possible promotion move using modal
      console.log("promotion move");
      move = moves[0];
    } else if (moves.length === 1) {
      move = moves[0];
    } else throw new Error("move length is not 1/4?!");
    if (!move) throw new Error("can't find move!");
    playMove(move);
    setAnimating(move);
  };

  const removeFocus = () => {
    setActivePiece(null);
    setActiveMoves([]);
    setPanels(createBoardPanels(game.board));
  };

  useEffect(() => {
    setPanels(createBoardPanels(game.board));
    setAnimating(null);
  }, [game.board]);

  useEffect(() => {
    document.onkeydown = (e) => {
      if (e.key.toLowerCase() === "f") {
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
          animating,
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

const createBoardPanels = (board: string[][]) => {
  const copyPanels = defaultPanels.map((arr) => arr.slice());

  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      if (board[rank][file] === ".") continue;
      copyPanels[rank][file] = 1;
    }
  }
  return copyPanels;
};

function createPositions(size: number): Positions {
  const positions: { x: number; y: number }[][] = [];

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
