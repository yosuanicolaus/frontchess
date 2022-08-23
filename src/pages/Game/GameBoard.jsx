import { useRef } from "react";
import { useDimensions } from "../../helper/dimensions";
import { useGameDB } from "./GameHooks";
import BoardEmpty from "./Board/BoardEmpty";
import BoardPending from "./Board/BoardPending";
import BoardReady from "./Board/BoardReady";
import BoardWaiting from "./Board/BoardWaiting";

function GameBoard() {
  const ref = useRef();
  const dim = useDimensions(ref);
  const { game } = useGameDB();

  const size = 400;

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
      default:
        <div>can't found board for this state!</div>;
    }
  };

  return (
    <section ref={ref} className="board col-lg-6 col-md-7 col d-flex bg-light">
      <main
        style={{ height: size, width: size }}
        className="border border-5 border-primary shadow-lg m-auto d-flex text-bg-dark bg-gradient"
      >
        {getBoard(game.state)}
      </main>
    </section>
  );
}

export default GameBoard;
