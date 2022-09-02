import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
          <tbody>
            {lobbyData.map((data) => (
              <RowData data={data} />
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

interface RowDataProps {
  data: {
    idx: number;
    id: string;
    name: string;
    elo: number;
    timeControl: string;
  };
}

function RowData({ data }: RowDataProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <tr
      key={`lobby-${data.id}`}
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/game/${data.id}`)}
    >
      <th scope="row">{data.idx}</th>
      <td>{data.name}</td>
      <td>{data.elo}</td>
      <td>{data.timeControl}</td>
    </tr>
  );
}

export default AppTable;
