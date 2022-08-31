import { useAuth } from "../helper/auth";
import { Player, User } from "../helper/types";
import { useGameDB } from "./GameHooks";

function GameInfo() {
  const { game } = useGameDB();

  const getInfo = (state: string) => {
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

function UserInfo({ user }: { user: User }) {
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
  const { uid } = useAuth();
  const { game } = useGameDB();

  let playerMe, playerOpponent;
  if (uid === game.pwhite.uid) {
    playerMe = game.pwhite;
    playerOpponent = game.pblack;
  } else if (uid === game.pblack.uid) {
    playerMe = game.pblack;
    playerOpponent = game.pwhite;
  } else {
    // TODO: implement viewer's perspective
    throw new Error("Implement viewer's info perspective");
  }

  return (
    <>
      <PlayerInfo player={playerOpponent} />
      <PlayHistory />
      <PlayerInfo player={playerMe} />
    </>
  );
}

function PlayHistory() {
  const { game } = useGameDB();
  const historyArray = createHistoryArray(game.history);
  console.table(historyArray);

  return (
    <div className="row flex-grow-1 d-flex text-bg-primary bg-gradient">
      <div className="m-auto">
        <div>PGN: {game.pgn}</div>
      </div>
    </div>
  );
}

function PlayerInfo({ player }: { player: Player }) {
  const { game } = useGameDB();
  let playerClass = "row ";
  if (player.uid === game.pwhite.uid) playerClass += "text-bg-light";
  if (player.uid === game.pblack.uid) playerClass += "text-bg-dark";

  return (
    <div className={playerClass}>
      <strong>{player.name}</strong>

      {player.active && (
        <div className="fst-italic text-success fw-bold">Active</div>
      )}
      {!player.active && <div className="fst-italic">Inactive</div>}
    </div>
  );
}

type HistoryArray = {
  turn: number;
  whiteSan: string;
  blackSan?: string;
}[];

function createHistoryArray(history: string[]) {
  const historyArray: HistoryArray = [];
  let turn = 1;

  for (let i = 0; i < history.length; i++) {
    if (i % 2 === 0) {
      historyArray.push({
        turn: turn,
        whiteSan: history[i],
      });
    } else {
      historyArray[turn - 1].blackSan = history[i];
      turn++;
    }
  }
  return historyArray;
}

export default GameInfo;
