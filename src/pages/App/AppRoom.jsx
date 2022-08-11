function AppRoom() {
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
        <button className="btn btn-outline-primary flex-grow-1">
          Join Random
        </button>
        <button className="btn btn-outline-primary flex-grow-1">
          Create Room
        </button>
      </div>
    </>
  );
}

export default AppRoom;
