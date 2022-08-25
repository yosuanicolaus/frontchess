import { useBoard } from "./Board";

export default function BackPanels() {
  const { positions, size, panels } = useBoard();
  const panelSize = size / 8;

  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      if (panels[rank][file]) {
        const { x, y } = positions[rank][file];
        panels.push(
          <BackPanel
            x={x}
            y={y}
            size={panelSize}
            code={panels[rank][file]}
            key={`back-panel-${rank}-${file}`}
          />
        );
      }
    }
  }
  return panels.map((panel) => panel);
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
    case 1:
      return localStorage.getItem("icon-move") || defaultMove;
    case 2:
      return localStorage.getItem("icon-capture") || defaultCapture;
    default:
      return localStorage.getItem("icon-piece") || defaultPiece;
  }
}
