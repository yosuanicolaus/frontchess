import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { postGameJoin } from "../../helper/api";
import { auth } from "../../helper/auth";
import { socket } from "../../helper/socket";

function AppRoom() {
  const [loading, setLoading] = useState(false);
  const [joinID, setJoinID] = useState("");
  const navigate = useNavigate();

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
      console.log(data);
      return;
    }
    console.log(data);
    socket.emit("join", gameID);
    navigate(`/game/${gameID}`);
  };

  const joinRandomMatch = () => {
    if (loading) return;
    setLoading("Looking for a match...");
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
            className="form-control"
            autoComplete="off"
            onChange={(e) => setJoinID(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Join
          </button>
        </div>
      </form>
      {/* TODO: add error message when failed to join room */}

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
