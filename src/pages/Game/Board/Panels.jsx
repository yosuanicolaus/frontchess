import { useState, useEffect } from "react";
import { useBoard } from "./Board";

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

export default function Panels() {
  const { positions, size, activeMoves, activePiece } = useBoard();
  const panelSize = size / 8;
  const panels = [];
  const [activePanels, setActivePanels] = useState(defaultPanels);

  useEffect(() => {
    if (!activeMoves) return;
    const copiedPanels = defaultPanels.map((arr) => arr.slice());

    if (activePiece.rank >= 0) {
      const { rank, file } = activePiece;
      copiedPanels[rank][file] = 3;
    }
    activeMoves.forEach((move) => {
      const { rank, file } = move.to;
      if (move.capture) {
        copiedPanels[rank][file] = 2;
      } else {
        copiedPanels[rank][file] = 1;
      }
    });
    setActivePanels(copiedPanels);
  }, [activeMoves, activePiece]);

  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      const { x, y } = positions[rank][file];
      if (activePanels[rank][file]) {
        panels.push(
          <ActivePanel
            x={x}
            y={y}
            rank={rank}
            file={file}
            size={panelSize}
            code={activePanels[rank][file]}
            key={`active-panel-${rank}-${file}`}
          />
        );
      } else {
        panels.push(
          <Panel x={x} y={y} size={panelSize} key={`panel-${rank}-${file}`} />
        );
      }
    }
  }

  return panels.map((panel) => panel);
}

function Panel({ x, y, size }) {
  const { removeFocus } = useBoard();

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
      }}
      onClick={removeFocus}
    />
  );
}

function ActivePanel({ x, y, size, rank, file, code }) {
  const { playRankFile } = useBoard();

  const handleClick = () => {
    playRankFile(rank, file);
  };

  return (
    <img
      src={getSvgFromCode(code)}
      alt={""}
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

function getSvgFromCode(code) {
  const defaultMove = "/icons/clover.svg";
  const defaultCapture = "/icons/level-four.svg";
  const defaultPiece = "/icons/clover-spiked.svg";

  switch (code) {
    case 1:
      return localStorage.getItem("icon-move") || defaultMove;
    case 2:
      return localStorage.getItem("icon-capture") || defaultCapture;
    default:
      return localStorage.getItem("icon-piece") || defaultPiece;
  }
}
