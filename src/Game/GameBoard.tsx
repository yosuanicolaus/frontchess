import {
  useRef,
  useState,
  useEffect,
  SetStateAction,
  ChangeEvent,
} from "react";
import { useDimensions } from "../helper/dimensions";
import { useGameDB } from "./GameHooks";
import BoardEmpty from "./BoardState/BoardEmpty";
import BoardWaiting from "./BoardState/BoardWaiting";
import BoardPending from "./BoardState/BoardPending";
import BoardReady from "./BoardState/BoardReady";
import Board from "./Board/Board";
import { Dispatch } from "react";

function GameBoard() {
  const ref = useRef<HTMLDivElement>(null);
  const dim = useDimensions(ref);
  const { game, myTurn } = useGameDB();
  const [size, setSize] = useState(450);

  const boardColor = (() => {
    if (game.state === "playing") {
      if (myTurn) return "info";
      else return "dark";
    } else if (game.state === "ended") {
      if (myTurn) return "danger";
      else return "success";
    } else return "primary";
  })();

  const boardState = (() => {
    switch (game.state) {
      case "empty":
        return <BoardEmpty />;
      case "waiting":
        return <BoardWaiting />;
      case "pending":
        return <BoardPending />;
      case "ready":
        return <BoardReady />;
      case "playing":
      case "ended":
        return <Board size={size} />;
      default:
        return <div>can't found board for this state!</div>;
    }
  })();

  return (
    <section className="board col-md-7 col d-flex flex-column bg-light">
      <div className="d-flex flex-grow-1" ref={ref}>
        <div
          className={`border border-4 border-${boardColor} m-auto shadow-lg`}
        >
          <main
            style={{ height: size, width: size }}
            className="shadow-lg m-auto d-flex text-bg-dark bg-gradient"
          >
            {boardState}
          </main>
        </div>
      </div>
      <SizeControl size={size} setSize={setSize} dim={dim} />
    </section>
  );
}

interface ControlProps {
  size: number;
  setSize: Dispatch<SetStateAction<number>>;
  dim: {
    width: number;
    height: number;
  };
}

function SizeControl({ size, setSize, dim }: ControlProps) {
  const min = 400;
  const [max, setMax] = useState(600);
  const [disabled, setDisabled] = useState(false);

  const setFloorSize = (value: number) => {
    setSize(Math.floor(value));
  };

  const handleSlide = (e: ChangeEvent<HTMLInputElement>) => {
    const numberValue = Number(e.target.value);
    setFloorSize(numberValue);
  };

  const lerp = (a: number, b: number, t: number) => {
    return a + (b - a) * t;
  };

  useEffect(() => {
    const smallerSide = Math.min(dim.width, dim.height);
    const distance = smallerSide - min;
    const newMax = (3 / 4) * distance + min;
    let recommendedSize = (min + newMax) / 2;

    if (smallerSide === 0) return;
    if (distance <= 15) {
      setDisabled(true);
      setFloorSize(smallerSide - 15);
      recommendedSize = min;
    } else if (disabled) {
      setDisabled(false);
    }

    if (newMax < min) return;
    setMax(Math.floor(newMax));
    if (size > newMax) return setSize(newMax);
    setFloorSize(lerp(size, recommendedSize, 0.1));
    // eslint-disable-next-line
  }, [dim]);

  return (
    <div className="row text-bg-secondary pt-1">
      <label
        htmlFor="sizeControl"
        className="text-center small"
        hidden={disabled}
      >
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
        disabled={disabled}
      />
    </div>
  );
}

export default GameBoard;
