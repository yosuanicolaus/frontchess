import React from "react";
import { useGameDB } from "../GameHooks";
import { useBoard } from "./Board";

export default function Pieces() {
  const { game } = useGameDB();
  const { positions, size } = useBoard();
  const pieceSize = size / 8;
  const board = game.board;
  const pieces = [];

  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      const code = board[rank][file];
      if (code === ".") continue;
      const { x, y } = positions[rank][file];
      pieces.push(
        <Piece
          code={code}
          x={x}
          y={y}
          size={pieceSize}
          rank={rank}
          file={file}
          key={`${code}-${rank}-${file}`}
        />
      );
    }
  }

  return pieces.map((piece) => piece);
}

function Piece({ code, x, y, size, rank, file }) {
  const svgCode = getSvgCode(code);
  const { getMovesFromRankFile } = useBoard();

  const handleClick = () => {
    console.log("get moves for rank file:", rank, file);
    getMovesFromRankFile(rank, file);
  };

  return (
    <img
      src={`/pieces/${svgCode}.svg`}
      alt={svgCode}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
      }}
      onClick={handleClick}
    />
  );
}

function getSvgCode(code) {
  let svgCode;
  if (code.toUpperCase() === code) {
    svgCode = "w" + code;
  } else {
    svgCode = "b" + code.toUpperCase();
  }
  return svgCode;
}