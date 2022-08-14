import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { postGameNew } from "../../helper/api";

function AppRoom() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const joinRandomMatch = () => {
    if (loading) return;
    setLoading("Looking for a match...");
  };

  const createNewRoom = async () => {
    if (loading) return;
    setLoading("Creating a new room...");

    const data = await postGameNew();
    navigate(`game/${data.game._id}`);
  };

  return (
    <>
      <div className="d-flex gap-2">
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
          />
          <button type="submit" className="btn btn-primary">
            Join
          </button>
        </div>
      </div>

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
