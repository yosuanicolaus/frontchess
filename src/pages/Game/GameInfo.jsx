import { useAuth } from "../../helper/auth";
import { useGameDB } from "./GameHooks";

function GameInfo() {
  const { uid } = useAuth();
  const { game } = useGameDB();

  const owner = game.user0.uid === uid;
  const challenger = game.user1?.uid === uid;

  return (
    <section className="bg-secondary text-center col d-md-flex flex-column d-none border-start border-5 border-primary">
      <div className="row flex-grow-1 d-flex mb-1 text-bg-primary border border-secondary">
        {owner && <UserInfo user={game.user1} />}
        {challenger && <UserInfo user={game.user0} />}
      </div>
      <div className="badge text-bg-light mx-auto">VS</div>
      <div className="row flex-grow-1 d-flex mt-1 text-bg-primary border border-secondary">
        {owner && <UserInfo user={game.user0} />}
        {challenger && <UserInfo user={game.user1} />}
      </div>
    </section>
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

export default GameInfo;
