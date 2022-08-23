import { useAuth } from "../../../helper/auth";
import { useGameDB } from "../GameHooks";

export default function BoardReady() {
  const { uid } = useAuth();
  const { game } = useGameDB();

  const owner = uid === game.user0.uid;
  const challenger = uid === game.user1.uid;

  return (
    <div className="container-fluid d-flex flex-column text-center border border-5 border-success">
      <h3 className="row py-3 bg-primary">
        <div className="col">Board Ready</div>
      </h3>

      <div className="row my-auto">
        <div className="col-6">
          {owner ? <em>- Owner (you) -</em> : <em>- Owner -</em>}
          <div className="fw-bold">{game.user0.name}</div>
          <div className="fst-italic">- {game.user0.elo} -</div>
        </div>

        <div className="col-6">
          {challenger ? <em>- Challenger (you) -</em> : <em>- Challenger -</em>}
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
    <div className="row text-bg-primary">
      <button className="col btn btn-outline-success mx-3 mt-3">Start</button>

      <div>Challenger is ready. You can start the game</div>
    </div>
  );
}

function ControlChallenger() {
  const { toggleReady } = useGameDB();

  return (
    <div className="row text-bg-primary">
      <button className="col btn btn-success mx-3 mt-3" onClick={toggleReady}>
        Ready
      </button>
      <div>You are ready. Waiting for owner to start the game</div>
    </div>
  );
}
