import { useAuth } from "../../helper/auth";
import { useGameDB } from "./GameHooks";

function GameInfo() {
  const { game } = useGameDB();

  const getInfo = (state) => {
    switch (state) {
      case "empty":
      case "waiting":
      case "pending":
      case "ready":
        return <PreInfo />;
      case "playing":
        return <PlayingInfo />;
      default:
        return <div>can't found info for this state!</div>;
    }
  };

  return (
    <section className="bg-secondary text-center col d-md-flex flex-column d-none border-start border-5 border-primary pe-4">
      {getInfo(game.state)}
    </section>
  );
}

function PreInfo() {
  const { uid } = useAuth();
  const { game } = useGameDB();

  const owner = game.user0.uid === uid;
  const challenger = game.user1?.uid === uid;

  return (
    <>
      <div className="row flex-grow-1 d-flex mb-1 text-bg-primary border border-secondary">
        {owner && <UserInfo user={game.user1} />}
        {challenger && <UserInfo user={game.user0} />}
      </div>
      <div className="badge text-bg-light mx-auto">VS</div>
      <div className="row flex-grow-1 d-flex mt-1 text-bg-primary border border-secondary">
        {owner && <UserInfo user={game.user0} />}
        {challenger && <UserInfo user={game.user1} />}
      </div>
    </>
  );
}

function UserInfo({ user }) {
  return (
    <div
      className="my-auto flex-grow-1"
      style={{ overflowX: "auto", width: 0 }}
    >
      {user ? (
        <>
          <div>{user?.name}</div>
          <div>- {user?.elo} -</div>
        </>
      ) : (
        <em>waiting for another player to join...</em>
      )}
    </div>
  );
}

function PlayingInfo() {
  const { game } = useGameDB();

  return (
    <>
      <div className="row text-bg-dark">
        <PlayerInfo player={game.pblack} />
      </div>
      <div className="row flex-grow-1 d-flex text-bg-primary bg-gradient">
        <PlayHistory history={game.history} />
      </div>
      <div className="row text-bg-light">
        <PlayerInfo player={game.pwhite} />
      </div>
    </>
  );
}

function PlayHistory() {
  const { game } = useGameDB();

  return (
    <div className="m-auto">
      <div>History: {game.history.toString()}</div>
      <div>PGN: {game.pgn}</div>
    </div>
  );
}

function PlayerInfo({ player }) {
  return (
    <div>
      <strong>{player.name}</strong>
      <div className="fst-italic">Active: {player.active.toString()}</div>
      <div className="fst-italic">Online: {player.online.toString()}</div>
    </div>
  );
}

export default GameInfo;
