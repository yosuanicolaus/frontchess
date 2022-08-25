import { useBoard } from "./Board";

export default function FrontPanels() {
  const { panels, positions, size } = useBoard();
  const panelSize = size / 8;
  const frontPanels = [];

  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      let panel;
      const { x, y } = positions[rank][file];
      switch (panels[rank][file]) {
        case 0:
          panel = (
            <NormalPanel
              x={x}
              y={y}
              size={panelSize}
              key={`front-panel-${rank}-${file}`}
            />
          );
          break;
        case 1:
          panel = (
            <PiecePanel
              x={x}
              y={y}
              size={panelSize}
              rank={rank}
              file={file}
              key={`front-panel-${rank}-${file}`}
            />
          );
          break;
        case 2:
        case 3:
          panel = (
            <MovePanel
              x={x}
              y={y}
              size={panelSize}
              rank={rank}
              file={file}
              key={`front-panel-${rank}-${file}`}
            />
          );
          break;
        default:
          panel = (
            <PiecePanel
              x={x}
              y={y}
              size={panelSize}
              rank={rank}
              file={file}
              key={`front-panel-${rank}-${file}`}
            />
          );
      }
      frontPanels.push(panel);
    }
  }
  return frontPanels.map((panel) => panel);
}

function NormalPanel({ x, y, size }) {
  const { removeFocus } = useBoard();

  return <Panel x={x} y={y} size={size} onClick={removeFocus} />;
}

function PiecePanel({ x, y, size, rank, file }) {
  const { getMovesFromRankFile } = useBoard();

  const handleClick = () => {
    getMovesFromRankFile(rank, file);
  };

  return <Panel x={x} y={y} size={size} onClick={handleClick} />;
}

function MovePanel({ x, y, size, rank, file }) {
  const { playRankFile } = useBoard();

  const handleClick = () => {
    playRankFile(rank, file);
  };

  return <Panel x={x} y={y} size={size} onClick={handleClick} />;
}

function Panel({ x, y, size, onClick }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
      }}
      onClick={onClick}
    />
  );
}
