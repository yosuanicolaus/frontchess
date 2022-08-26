import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { useApi } from "../../helper/api";
import { isValid, convertLink } from "./utils";

function AppRoom() {
  const { getGame, getGameRandomOpen } = useApi();
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [noGame, setNoGame] = useState(false);
  const [joinID, setJoinID] = useState("");
  const navigate = useNavigate();

  const handleChangeJoin = (e) => {
    setJoinID(e.target.value);
    setInvalid(false);
    setNoGame(false);
  };

  const handleSubmitJoin = async (e) => {
    e.preventDefault();
    let id = joinID;
    if (loading) return;
    if (!isValid(id)) return setInvalid("invalid game ID");
    id = convertLink(id);
    setLoading(`Looking for a game with id of ${id}`);
    const data = await getGame(id);
    if (typeof data === "string") {
      setLoading(false);
      setNoGame(false);
      setInvalid(data);
      return;
    }
    joinGame(id);
  };

  const joinGame = async (id) => {
    setLoading(`Joining game ${id}...`);
    navigate(`/game/${id}`);
  };

  const joinRandomMatch = async () => {
    if (loading) return;
    setLoading("Looking for an open game...");
    const data = await getGameRandomOpen();
    if (typeof data === "string") {
      setLoading(false);
      setInvalid(false);
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
