import React, { useState } from "react";
import Loading from "../../../components/Loading";
import { useAuth } from "../../../helper/auth";
import { useGameDB } from "../GameHooks";

export default function BoardReady() {
  const { uid } = useAuth();
  const { game } = useGameDB();

  const owner = uid === game.user0.uid;
  const challenger = uid === game.user1.uid;

  return (
    <div className="container-fluid d-flex flex-column text-center border border-5 border-success">
      <div className="row pt-2 pb-1 bg-primary">
        <h3 className="m-0">Board Ready</h3>
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
  const { startGame } = useGameDB();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    startGame();
  };

  return (
    <div className="row text-bg-primary">
      <button
        className="col btn btn-outline-success mx-3 mt-3"
        onClick={handleClick}
        disabled={loading}
      >
        Start {loading && <Loading />}
      </button>

      <div>Challenger is ready. You can start the game</div>
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
        className="col btn btn-success mx-3 mt-3"
        onClick={handleClick}
        disabled={loading}
      >
        Ready {loading && <Loading />}
      </button>
      <div>You are ready. Waiting for owner to start the game</div>
    </div>
  );
}
