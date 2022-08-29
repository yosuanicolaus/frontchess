import React from "react";
import { useGameDB } from "../GameHooks";
import { useBoard } from "./Board";

export default function Pieces() {
  const { game } = useGameDB();
  const { positions, size, flipped } = useBoard();
  const pieceSize = size / 8;
  const board = game.board;
  const pieces = [];

  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      const r = flipped ? 7 - rank : rank;
      const f = flipped ? 7 - file : file;
      const boardCode = board[r][f];
      if (boardCode === ".") continue;
      const { x, y } = positions[rank][file];
      pieces.push(
        <Piece
          boardCode={boardCode}
          x={x}
          y={y}
          size={pieceSize}
          key={`${boardCode}-${rank}-${file}`}
        />
      );
    }
  }
  return <>{pieces.map((piece) => piece)}</>;
}

type PieceProps = {
  boardCode: string;
  x: number;
  y: number;
  size: number;
};

function Piece({ boardCode, x, y, size }: PieceProps) {
  const svgCode = getPieceSvgCode(boardCode);

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
    />
  );
}

function getPieceSvgCode(code: string) {
  let svgCode;
  if (code.toUpperCase() === code) {
    svgCode = "w" + code;
  } else {
    svgCode = "b" + code.toUpperCase();
  }
  return svgCode;
}
