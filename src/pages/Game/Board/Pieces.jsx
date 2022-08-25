import React from "react";

export function Pieces({ board, positions, size }) {
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
          size={size}
          key={`${code}-${rank}-${file}`}
        />
      );
    }
  }

  return pieces.map((piece) => piece);
}

function Piece({ code, x, y, size }) {
  let svgCode;
  if (code.toUpperCase() === code) {
    svgCode = "w" + code;
  } else {
    svgCode = "b" + code.toUpperCase();
  }
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
