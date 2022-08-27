import { useBoard } from "./Board";

export default function BackPanels() {
  const { positions, size, panels, flipped } = useBoard();
  const panelSize = size / 8;
  const backPanels = [];

  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      if (panels[rank][file] >= 2) {
        const r = flipped ? 7 - rank : rank;
        const f = flipped ? 7 - file : file;
        const { x, y } = positions[r][f];
        const code = panels[rank][file];
        backPanels.push(
          <BackPanel
            x={x}
            y={y}
            size={panelSize}
            code={code}
            key={`back-panel-${r}-${f}`}
          />
        );
      }
    }
  }
  return backPanels.map((panel) => panel);
}

function BackPanel({ x, y, size, code }) {
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
    />
  );
}

function getSvgFromCode(code) {
  const defaultMove = "/icons/clover.svg";
  const defaultCapture = "/icons/level-four.svg";
  const defaultPiece = "/icons/clover-spiked.svg";

  switch (code) {
    case 2:
      return localStorage.getItem("icon-move") || defaultMove;
    case 3:
      return localStorage.getItem("icon-capture") || defaultCapture;
    default:
      return localStorage.getItem("icon-piece") || defaultPiece;
  }
}
