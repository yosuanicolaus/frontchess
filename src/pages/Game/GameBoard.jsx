import { useRef } from "react";
import { useDimensions } from "../../helper/dimensions";
import BoardEmpty from "./Board/BoardEmpty";
import BoardPendingReady from "./Board/BoardPendingReady";
import BoardWaiting from "./Board/BoardWaiting";

function GameBoard({ gameDB }) {
  const ref = useRef();
  const dim = useDimensions(ref);

  const size = 400;

  const getBoard = (state) => {
    switch (state) {
      case "empty":
        return <BoardEmpty />;
      case "waiting":
        return <BoardWaiting gameDB={gameDB} />;
      case "pending":
      case "ready":
        return <BoardPendingReady gameDB={gameDB} />;
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
        {getBoard(gameDB.state)}
      </main>
    </section>
  );
}

export default GameBoard;
