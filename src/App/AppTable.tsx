import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { socket } from "../helper/socket";
import { GameModel } from "../helper/types";

function AppTable() {
  const [games, setGames] = useState<GameModel[]>([]);

  const lobbyData =
    games &&
    games.map((game, index) => {
      return {
        idx: index + 1,
        id: game._id,
        name: game.user0.name,
        elo: game.user0.elo,
        timeControl: game.timeControl,
      };
    });

  useEffect(() => {
    socket.emit("join-lobby");
    socket.on("update-lobby", (games: GameModel[]) => {
      setGames(games);
    });
    return () => {
      socket.off("update-lobby");
      socket.emit("leave-lobby");
    };
  }, []);

  if (!games) return <Loading text="getting open game..." />;

  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr className="text-bg-secondary">
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">ELO</th>
            <th scope="col">Time Control</th>
          </tr>
        </thead>

        {lobbyData.length > 0 && (
          // {/* TODO: make each table row a clickable link */}
          <tbody>
            {lobbyData.map((data) => (
              <tr key={`lobby-${data.idx}`}>
                <th scope="row">{data.idx}</th>
                <td>{data.name}</td>
                <td>{data.elo}</td>
                <td>{data.timeControl}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>

      {lobbyData.length === 0 && (
        <div className="p-3 text-center">
          <em>No open game found</em>
          <br />
          <em>Create a new game and invite your friends!</em>
        </div>
      )}
    </>
  );
}

export default AppTable;
