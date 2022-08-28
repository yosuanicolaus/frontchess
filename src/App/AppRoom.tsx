import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useApi } from "../helper/api";
import { isValid, convertLink } from "./utils";

function AppRoom() {
  const { getGame, getGameRandomOpen } = useApi();
  const [loading, setLoading] = useState<string | null>(null);
  const [invalid, setInvalid] = useState<string | null>(null);
  const [noGame, setNoGame] = useState<string | null>(null);
  const [joinID, setJoinID] = useState("");
  const navigate = useNavigate();

  const handleChangeJoin = (e: ChangeEvent<HTMLInputElement>) => {
    setJoinID(e.target.value);
    setInvalid(null);
    setNoGame(null);
  };

  const handleSubmitJoin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let id = joinID;
    if (loading) return;
    if (!isValid(id)) return setInvalid("invalid game ID");
    id = convertLink(id);
    setLoading(`Looking for a game with id of ${id}`);
    const data = await getGame(id);
    if (typeof data === "string") {
      setLoading(null);
      setNoGame(null);
      setInvalid(data);
      return;
    }
    joinGame(id);
  };

  const joinGame = async (id: string) => {
    setLoading(`Joining game ${id}...`);
    navigate(`/game/${id}`);
  };

  const joinRandomMatch = async () => {
    if (loading) return;
    setLoading("Looking for an open game...");
    const data = await getGameRandomOpen();
    if (typeof data === "string") {
      setLoading(null);
      setInvalid(null);
      setNoGame(data);
      return;
    }
    setJoinID(data._id);
    joinGame(data._id);
  };

  const createNewRoom = () => {
    if (loading) return;
    navigate("/game");
  };

  return (
    <>
      <form className="d-flex gap-2" onSubmit={handleSubmitJoin}>
        <label
          htmlFor="joinRoom"
          className="me-auto form-label align-self-center"
        >
          Join Room:
        </label>

        <div className="input-group">
          <input
            type="text"
            name="joinRoom"
            id="joinRoom"
            placeholder="insert room ID here..."
            className={invalid ? "form-control is-invalid" : "form-control"}
            autoComplete="off"
            onChange={handleChangeJoin}
            required
          />
          <button type="submit" className="btn btn-primary">
            Join
          </button>
        </div>
      </form>
      {invalid && <div className="text-danger text-sm-center">{invalid}</div>}
      {noGame && <div className="text-warning text-sm-center">{noGame}</div>}

      <div className="d-flex gap-3">
        <button
          className="btn btn-outline-primary flex-grow-1"
          onClick={joinRandomMatch}
        >
          Join Random
        </button>
        <button
          className="btn btn-outline-primary flex-grow-1"
          onClick={createNewRoom}
        >
          Create Room
        </button>
      </div>

      {loading && <Loading text={loading} setLoading={setLoading} />}
    </>
  );
}

export default AppRoom;
