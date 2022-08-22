export default function BoardPendingReady({ gameDB }) {
  return (
    <div className="container-fluid d-flex flex-column text-center">
      <h3 className="text-capitalize my-3">Board {gameDB.state}</h3>

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

      <button className="btn btn-danger mx-3 mt-3" disabled>
        Start
      </button>

      <div className="text-light">waiting for the other player to ready</div>
    </div>
  );
}
