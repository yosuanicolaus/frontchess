import { useRef, useState, useEffect } from "react";
import { useDimensions } from "../../helper/dimensions";
import { useGameDB } from "./GameHooks";
import BoardEmpty from "./Board/BoardEmpty";
import BoardWaiting from "./Board/BoardWaiting";
import BoardPending from "./Board/BoardPending";
import BoardReady from "./Board/BoardReady";
import Board from "./Board/Board";

function GameBoard() {
  const ref = useRef();
  const dim = useDimensions(ref);
  const { game } = useGameDB();
  const [size, setSize] = useState(450);

  const getBoard = (state) => {
    switch (state) {
      case "empty":
        return <BoardEmpty />;
      case "waiting":
        return <BoardWaiting />;
      case "pending":
        return <BoardPending />;
      case "ready":
        return <BoardReady />;
      case "playing":
        return <Board />;
      default:
        <div>can't found board for this state!</div>;
    }
  };

  return (
    <section
      ref={ref}
      className="board col-lg-6 col-md-7 col d-flex flex-column bg-light"
    >
      <main
        style={{ height: size, width: size }}
        className="shadow-lg m-auto d-flex text-bg-dark bg-gradient"
      >
        {getBoard(game.state)}
      </main>
      {/* TODO: size control for mobile */}
      <SizeControl size={size} setSize={setSize} dim={dim} />
    </section>
  );
}

function SizeControl({ size, setSize, dim }) {
  const min = 350;
  const [max, setMax] = useState(600);

  const setFloorSize = (value) => {
    setSize(Math.floor(value));
  };

  const handleSlide = (e) => {
    setFloorSize(e.target.value);
  };

  const lerp = (a, b, t) => {
    return a + (b - a) * t;
  };

  useEffect(() => {
    const smallerSide = Math.min(dim.width, dim.height);
    const distance = smallerSide - min;
    const newMax = (3 / 4) * distance + min;
    const recommendedSize = (min + newMax) / 2;

    if (newMax < min) return;
    setMax(newMax);
    if (size > newMax) return setSize(newMax);
    setFloorSize(lerp(size, recommendedSize, 0.1));
    // eslint-disable-next-line
  }, [dim]);

  return (
    <div className="row text-bg-secondary p-2">
      <label htmlFor="sizeControl" className="text-center small">
        Set Board Size
      </label>
      <input
        id="sizeControl"
        type="range"
        className="form-range"
        min={min}
        max={max}
        value={size}
        onChange={handleSlide}
      />
    </div>
  );
}

export default GameBoard;
