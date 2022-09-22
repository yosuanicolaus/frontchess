import React, { useState } from "react";
import Loading from "../../components/Loading";
import { useAuth } from "../../lib/auth";
import { useGameDB } from "../GameHooks";

export default function BoardPending() {
  const { uid } = useAuth();
  const { game } = useGameDB();

  const owner = uid === game.user0.uid;
  const challenger = uid === game.user1.uid;

  return (
    <div className="container-fluid d-flex flex-column text-center border border-5 border-secondary">
      <div className="row pt-2 pb-1 bg-primary">
        <h3 className="m-0">Board Pending</h3>
        <em>Game ID: {game._id}</em>
      </div>

      <div className="row my-auto overflow-hidden">
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
      <button className="col btn btn-outline-danger mx-3 mt-3" disabled>
        Start
      </button>

      <div className="opacity-75">Waiting for challenger to be ready</div>
    </div>
  );
}

function ControlChallenger() {
  const { toggleReady } = useGameDB();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    toggleReady();
  };

  return (
    <div className="row text-bg-primary">
      <button
        className="col btn btn-outline-light mx-3 mt-3"
        onClick={handleClick}
        disabled={loading}
      >
        Ready {loading && <Loading />}
      </button>
      <div className="opacity-75">Waiting for you to ready</div>
    </div>
  );
}
