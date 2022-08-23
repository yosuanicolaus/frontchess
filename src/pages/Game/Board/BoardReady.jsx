import { useAuth } from "../../../helper/auth";

export default function BoardReady({ gameDB }) {
  const { uid } = useAuth();

  const owner = uid === gameDB.user0.uid;
  const challenger = uid === gameDB.user1.uid;

  return (
    <div className="container-fluid d-flex flex-column text-center">
      <h3 className="my-3">Board Ready</h3>

      <div className="row my-auto">
        <div className="col-6">
          <div className="fw-bold">{gameDB.user0.name}</div>
          <div className="fst-italic">- {gameDB.user0.elo} -</div>
        </div>

        <div className="col-6">
          <div className="fw-bold">{gameDB.user1.name}</div>
          <div className="fst-italic">- {gameDB.user1.elo} -</div>
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
      <button className="btn btn-outline-success mx-3 mt-3">Start</button>

      <div className="text-light">Player is ready. You can start the game</div>
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
