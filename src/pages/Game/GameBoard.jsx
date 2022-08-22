import { useRef } from "react";
import { useDimensions } from "../../helper/dimensions";
import BoardEmpty from "./Board/BoardEmpty";
import BoardWaiting from "./Board/BoardWaiting";

function GameBoard({ gameDB }) {
  const ref = useRef();
  const dim = useDimensions(ref);

  const size = 400;

  const stateBoard = {
    empty: <BoardEmpty />,
    waiting: <BoardWaiting gameDB={gameDB} />,
  };

  return (
    <section ref={ref} className="board col-lg-6 col-md-7 col d-flex bg-light">
      <main
        style={{ height: size, width: size }}
        className="border border-5 border-primary shadow-lg m-auto d-flex text-bg-secondary bg-gradient"
      >
        {stateBoard[gameDB.state]}
      </main>
    </section>
  );
}

export default GameBoard;
