import React, { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useApi } from "../lib/api";

const minutesPerSide = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25, 30,
  40, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180,
];
const incrementsInSeconds = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25,
  30, 40, 45, 60, 90, 120, 150, 180,
];
const DEFAULT_MINUTE = 10;
const DEFAULT_INCREMENT = 5;

function GameCreate() {
  const { postGameNew } = useApi();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<string | null>(null);
  const [timeControl, setTimeControl] = useState(
    `${DEFAULT_MINUTE}+${DEFAULT_INCREMENT}`
  );
  const [customMinutes, setCustomMinutes] = useState(DEFAULT_MINUTE);
  const [customIncrement, setCustomIncrement] = useState(DEFAULT_INCREMENT);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(`Creating game (${timeControl})`);
    const data = await postGameNew(timeControl);
    const id = data._id;
    // TODO: handle if user clicked cancel
    navigate(`/game/${id}`);
  };

  useEffect(() => {
    setTimeControl(`${customMinutes}+${customIncrement}`);
  }, [customMinutes, customIncrement]);

  return (
    <div className="flex-grow-1 d-flex align-items-center justify-content-center">
      <div className="container mw-500px border shadow p-3">
        <h3>Create Game</h3>
        <hr />
        <form onSubmit={handleSubmit}>
          <fieldset className="form-group">
            <legend>Custom Time Control</legend>
            <label htmlFor="customRange1" className="form-label">
              Minutes per side: <strong>{customMinutes}</strong>
            </label>
            <input
              id="customRange1"
              type="range"
              className="form-range"
              min={0}
              max={minutesPerSide.length - 1}
              defaultValue={minutesPerSide.indexOf(DEFAULT_MINUTE)}
              onChange={(e) =>
                setCustomMinutes(minutesPerSide[Number(e.target.value)])
              }
            />
            <label htmlFor="customRange2" className="form-label">
              Increment in seconds: <strong>{customIncrement}</strong>
            </label>
            <input
              id="customRange2"
              type="range"
              className="form-range"
              min={0}
              max={incrementsInSeconds.length - 1}
              defaultValue={incrementsInSeconds.indexOf(DEFAULT_INCREMENT)}
              onChange={(e) =>
                setCustomIncrement(incrementsInSeconds[Number(e.target.value)])
              }
            />
          </fieldset>
          <div className="d-flex">
            <button className="btn btn-outline-primary mt-2 mx-auto">
              Create Game
            </button>
          </div>
          <div className="d-flex">
            <div className="mx-auto">
              {loading && <Loading text={loading} setLoading={setLoading} />}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GameCreate;
