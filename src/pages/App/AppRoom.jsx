import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { getGameRandomOpen, postGameJoin } from "../../helper/api";
import { auth } from "../../helper/auth";
import { socket } from "../../helper/socket";

function AppRoom() {
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

  const handleSubmitJoin = (e) => {
    if (loading) return;
    e.preventDefault();
    joinGame(joinID);
  };

  const joinGame = async (gameID) => {
    setLoading(`Joining game ${gameID}...`);
    const data = await postGameJoin(gameID, auth.currentUser.displayName);
    if (typeof data === "string") {
      // handle error
      setLoading(false);
      setInvalid(data);
      console.log(data);
      return;
    }
    console.log(data);
    socket.emit("join", gameID);
    navigate(`/game/${gameID}`);
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
    setJoinID(data.game._id);
    joinGame(data.game._id);
  };

  const createNewRoom = () => {
    if (loading) return;
    navigate("/game");
  };

  // TODO: when (loading), disable all buttons
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
