import { useEffect, useState } from "react";
import { useApi } from "../helper/api";
import { GameModel } from "../helper/types";

function AppTable() {
  const { getGameOpen } = useApi();
  const [games, setGames] = useState<GameModel[]>([]);

  const lobbyData = games.map((game, index) => {
    return {
      idx: index + 1,
      name: game.user0.name,
      elo: game.user0.elo,
      timeControl: game.timeControl,
    };
  });

  useEffect(() => {
    // TODO: create socket connection and listener
    getGameOpen().then((games) => {
      setGames(games);
    });
  }, [getGameOpen]);

  return (
    <table className="table table-hover">
      <thead>
        <tr className="text-bg-secondary">
          <th scope="col">#</th>
          <th scope="col">Username</th>
          <th scope="col">ELO</th>
          <th scope="col">Time Control</th>
        </tr>
      </thead>

      {lobbyData.length > 0 ? (
        <>
          {/* TODO: make each table row a clickable link */}
          <tbody>
            {lobbyData.map((data) => (
              <tr>
                <th scope="row">{data.idx}</th>
                <td>{data.name}</td>
                <td>{data.elo}</td>
                <td>{data.timeControl}</td>
              </tr>
            ))}
          </tbody>
        </>
      ) : (
        <tr>
          <td>
            <em>
              No open game found. Create a new game and invite your friends!
            </em>
          </td>
        </tr>
      )}
    </table>
  );
}

export default AppTable;
