import { useGameDB } from "../GameHooks";

function Board({ size }) {
  const { game } = useGameDB();
  const positions = createPositions(size);

  return (
    <main
      className="position-relative"
      style={{
        backgroundImage: "url(/boards/blue.svg)",
        width: size,
        height: size,
      }}
    >
      <div className="small font-monospace">hello world</div>
    </main>
  );
}

function createPositions(size) {
  const positions = [];

  for (let rank = 0; rank < 8; rank++) {
    positions.push([]);
    for (let file = 0; file < 8; file++) {
      const x = (file / 8) * size;
      const y = (rank / 8) * size;
      positions[rank].push({ x, y });
    }
  }
  return positions;
}

export default Board;
