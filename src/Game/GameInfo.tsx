import { useEffect, useRef, useState } from "react";
import { useAuth } from "../lib/auth";
import { Player, User } from "../lib/types";
import { useGameDB } from "./GameHooks";

function GameInfo() {
  const { game } = useGameDB();

  const stateInfo = (() => {
    switch (game.state) {
      case "empty":
      case "waiting":
      case "pending":
      case "ready":
        return <PreInfo />;
      case "playing":
      case "ended":
        return <PlayingInfo />;
    }
  })();

  return (
    <section className="bg-secondary text-center col d-md-flex flex-column d-none border-start border-5 border-primary pe-4">
      {stateInfo}
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
      <PlayerTimer player={playerOpponent} />
      <PlayHistory />
      <PlayerTimer player={playerMe} />
      <PlayerInfo player={playerMe} />
    </>
  );
}

function PlayHistory() {
  const { game } = useGameDB();
  const historyArray = createHistoryArray(game.history);
  const endTableRef = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    endTableRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [historyArray]);

  return (
    <div
      className="row flex-grow-1 d-flex text-bg-primary bg-gradient"
      style={{ height: 0, overflowY: "auto" }}
    >
      <table className="m-auto table table-hover table-striped table-primary small">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">white</th>
            <th scope="col">black</th>
          </tr>
        </thead>
        <tbody>
          {historyArray.length === 0 ? (
            <tr>
              <td>1</td>
              <td></td>
              <td></td>
            </tr>
          ) : (
            <>
              {historyArray.map(({ turn, whiteSan, blackSan = "" }) => (
                <tr key={`history-${turn}`}>
                  <td>{turn}</td>
                  <td>{whiteSan}</td>
                  <td>{blackSan}</td>
                </tr>
              ))}
            </>
          )}
          <tr ref={endTableRef} />
        </tbody>
      </table>
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

function PlayerTimer({ player }: { player: Player }) {
  const { game } = useGameDB();
  const playerActive =
    (game.pwhite.active && game.pwhite.uid === player.uid) ||
    (game.pblack.active && game.pblack.uid === player.uid);
  const timerColor = playerActive ? "success" : "secondary";

  const defaultTime =
    (player.uid === game.pwhite.uid ? game.pwhite.time : game.pblack.time) ||
    Number(game.timeControl.split("+")[0]) * 60_000;

  const [myTime, setMyTime] = useState(defaultTime);
  const date = new Date(myTime);
  const display = (() => {
    let m = date.getMinutes().toString();
    let s = date.getSeconds().toString();
    if (s.length === 1) s = "0" + s;
    return `${m}:${s}`;
  })();

  useEffect(() => {
    let timeoutID: NodeJS.Timeout;
    let intervalID: NodeJS.Timer;
    setMyTime(defaultTime);
    if (!playerActive) return;

    timeoutID = setTimeout(() => {
      setMyTime((time) => time - (defaultTime % 1000));
      intervalID = setInterval(() => {
        setMyTime((time) => time - 1000);
      }, 1000);
    }, defaultTime % 1000);

    return () => {
      if (timeoutID) clearTimeout(timeoutID);
      if (intervalID) clearInterval(intervalID);
    };
  }, [defaultTime, playerActive]);

  return (
    <div className={`row text-end text-bg-${timerColor}`}>
      <div className="lead">{display}</div>
    </div>
  );
}

export default GameInfo;
