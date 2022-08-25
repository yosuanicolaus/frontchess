import { useBoard } from "./Board";

export default function Panels() {
  const { positions, size } = useBoard();
  const panelSize = size / 8;
  const panels = [];

  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      const { x, y } = positions[rank][file];
      panels.push(
        <Panel
          x={x}
          y={y}
          rank={rank}
          file={file}
          size={panelSize}
          key={`panel-${rank}-${file}`}
        />
      );
    }
  }

  return panels.map((panel) => panel);
}

function Panel({ x, y, size, rank, file }) {
  const handleClick = () => {
    console.log("clicked panel", rank, file);
  };

  return (
    <div
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
