import React, { useState } from "react";

function AppRoom() {
  const [loading, setLoading] = useState(false);

  const joinRandomMatch = () => {
    setLoading(true);
  };

  const cancel = () => {
    setLoading(false);
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

      <div className="d-flex gap-3">
        <button
          className="btn btn-outline-primary flex-grow-1"
          onClick={joinRandomMatch}
        >
          Join Random
        </button>
        <button className="btn btn-outline-primary flex-grow-1">
          Create Room
        </button>
      </div>

      {loading && (
        <div>
          <span className="spinner-border text-primary"></span>
          <span className="mx-3">Looking for a match...</span>
          <button className="btn btn-sm btn-outline-dark" onClick={cancel}>
            Cancel
          </button>
        </div>
      )}
    </>
  );
}

export default AppRoom;
