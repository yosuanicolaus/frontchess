import { useParams } from "react-router-dom";
import { GameProvider } from "./GameHooks";
import GameBoard from "./GameBoard";
import GameChat from "./GameChat";
import GameInfo from "./GameInfo";

function GamePage() {
  const { id } = useParams();
  if (!id) return <>id params not detected</>;

  return (
    <GameProvider id={id}>
      <main className="flex-grow-1 d-flex">
        <div className="container-fluid p-0 overflow-hidden flex-grow-1 d-flex flex-column">
          <div className="row flex-grow-1">
            <GameChat />
            <GameBoard />
            <GameInfo />
          </div>

          <div className="row text-bg-secondary text-center d-md-none d-flex">
            <div className="col">Chat</div>
            <div className="col">Info</div>
          </div>

          <div className="row footer text-bg-primary text-center">
            <div className="col opacity-50">&copy; yosuanicolaus 2022</div>
          </div>
        </div>
      </main>
    </GameProvider>
  );
}

export default GamePage;
