import React, { useEffect, useState } from "react";
import { Move } from "../../helper/types";
import { useGameDB } from "../GameHooks";
import { useBoard } from "./Board";

export default function Pieces() {
  const { game } = useGameDB();
  const { positions, size, flipped, animating } = useBoard();
  const pieceSize = size / 8;
  const board = game.board;
  const pieces: JSX.Element[] = [];

  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      const pieceActive =
        animating?.to.rank === rank && animating?.to.file === file;
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
          active={pieceActive}
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
  active: boolean;
};

function Piece({ boardCode, x, y, size, active }: PieceProps) {
  const { animating, positions, flipped } = useBoard();
  const svgCode = getPieceSvgCode(boardCode);

  const [animatingPos, setAnimatingPos] = useState({ x: 0, y: 0 });

  const animateMove = (move: Move) => {
    const { rank: fromRank, file: fromFile } = move.from;
    const fromR = flipped ? 7 - fromRank : fromRank;
    const fromF = flipped ? 7 - fromFile : fromFile;
    const { x: fromX, y: fromY } = positions[fromR][fromF];

    const { rank: toRank, file: toFile } = move.to;
    const toR = flipped ? 7 - toRank : toRank;
    const toF = flipped ? 7 - toFile : toFile;
    const { x: toX, y: toY } = positions[toR][toF];

    const animationDuration = 500;
    const animationSteps = 25;
    let step = 0;

    const intervalID = setInterval(() => {
      step += animationSteps;
      if (step < animationDuration) {
        setAnimatingPos({
          x: lerp(fromX, toX, step / animationDuration),
          y: lerp(fromY, toY, step / animationDuration),
        });
      } else {
        clearInterval(intervalID);
      }
    }, animationSteps);
  };

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  useEffect(() => {
    if (active && animating) {
      console.log({ x, y, boardCode });
      animateMove(animating);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animating]);

  return (
    <img
      src={`/pieces/${svgCode}.svg`}
      alt={svgCode}
      style={{
        position: "absolute",
        left: active ? animatingPos.x : x,
        top: active ? animatingPos.y : y,
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
