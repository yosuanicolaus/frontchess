import { useRef } from "react";
import { useDimensions } from "../../helper/dimensions";

function GameBoard({ gameDB }) {
  const ref = useRef();
  const dim = useDimensions(ref);

  const size = 350;

  return (
    <section ref={ref} className="board col-lg-6 col-md-7 col d-flex">
      <main
        style={{ height: size, width: size }}
        className="border border-5 border-primary shadow-lg m-auto"
      >
        <h3>Game Board</h3>
        <div>
          {dim.width}, {dim.height}
        </div>
      </main>
    </section>
  );
}

export default GameBoard;
