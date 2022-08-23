import { useGameDB } from "../GameHooks";

export default function BoardWaiting() {
  const { game } = useGameDB();
  // TODO: when the app is deployed, replace with actual URL
  const url = `http://localhost:3000/game/${game._id}`;

  const copyGameID = () => {
    navigator.clipboard.writeText(game._id);
  };

  const copyGameLink = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="border border-5 border-secondary container-fluid d-flex">
      <form onSubmit={(e) => e.preventDefault()} className="m-auto">
        <em className="lead">Waiting for another player to join...</em>
        <label htmlFor="gameID" className="form-label">
          Game ID:
        </label>
        <div className="input-group input-group-sm">
          <input
            type="text"
            className="form-control form-control-sm"
            readOnly
            id="gameID"
            value={game._id}
          />
          <button className="btn btn-secondary btn-sm" onClick={copyGameID}>
            Copy
          </button>
        </div>

        <label htmlFor="gameLink" className="form-label">
          Game Link:
        </label>
        <div className="input-group input-group-sm">
          <input
            type="text"
            className="form-control form-control-sm"
            readOnly
            id="gameLink"
            value={url}
          />
          <button className="btn btn-secondary btn-sm" onClick={copyGameLink}>
            Copy
          </button>
        </div>
      </form>
    </div>
  );
}
