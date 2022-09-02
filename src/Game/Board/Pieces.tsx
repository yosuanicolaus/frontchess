import React, { useEffect, useState } from "react";
import { Move } from "../../helper/types";
import { useGameDB } from "../GameHooks";
import { useBoard } from "./Board";

export default function Pieces() {
  const { game } = useGameDB();
  const { positions, size, flipped } = useBoard();
  const pieceSize = size / 8;
  const board = game.board;
  const pieces: JSX.Element[] = [];

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
  const { animating, positions, flipped } = useBoard();
  const svgCode = getPieceSvgCode(boardCode);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const animateMove = (move: Move) => {
    let { rank, file } = move.to;
    const r = flipped ? 7 - rank : rank;
    const f = flipped ? 7 - file : file;
    const { x: toX, y: toY } = positions[r][f];
    setOffset({
      x: toX - x,
      y: toY - y,
    });
  };

  useEffect(() => {
    if (animating) {
      const move = animating;
      const { rank, file } = move.from;
      const r = flipped ? 7 - rank : rank;
      const f = flipped ? 7 - file : file;
      if (positions[r][f].x === x && positions[r][f].y === y) {
        console.log("This!");
        console.log({ x, y, boardCode });
        animateMove(move);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animating]);

  return (
    <img
      src={`/pieces/${svgCode}.svg`}
      alt={svgCode}
      style={{
        position: "absolute",
        left: x + offset.x,
        top: y + offset.y,
        width: size,
        height: size,
        transition: animating ? "left .5s, top .5s" : "",
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
