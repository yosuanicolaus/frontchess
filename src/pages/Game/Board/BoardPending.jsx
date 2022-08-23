import { useAuth } from "../../../helper/auth";
import { useGameDB } from "../GameHooks";

export default function BoardPending() {
  const { uid } = useAuth();
  const { game } = useGameDB();

  const owner = uid === game.user0.uid;
  const challenger = uid === game.user1.uid;

  return (
    <div className="container-fluid d-flex flex-column text-center">
      <h3 className="my-3">Board Pending</h3>

      <div className="row my-auto">
        <div className="col-6">
          <div className="fw-bold">{game.user0.name}</div>
          <div className="fst-italic">- {game.user0.elo} -</div>
        </div>

        <div className="col-6">
          <div className="fw-bold">{game.user1.name}</div>
          <div className="fst-italic">- {game.user1.elo} -</div>
        </div>
      </div>

      {owner && <ControlOwner />}
      {challenger && <ControlChallenger />}
    </div>
  );
}

function ControlOwner() {
  return (
    <>
      <button className="btn btn-danger mx-3 mt-3" disabled>
        Start
      </button>

      <div className="text-light">waiting for the other player to ready</div>
    </>
  );
}

function ControlChallenger() {
  return (
    <>
      <button className="btn btn-outline-light mx-3 mt-3">Ready</button>
      <div className="text-light">
        click ready so that owner can start the game
      </div>
    </>
  );
}
