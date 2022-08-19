import {
  getAllGames,
  getGame,
  postGameNew,
  postUserNew,
  getUser,
} from "../helper/api";

const testData = [
  [getAllGames],
  [getGame, "somegameid"],
  [postGameNew, "12+6"],
  [postUserNew, "qwertyzxcvnice25"],
  [getUser, "qwertyzxcvnice25"],
];

function Test() {
  const logApi = (apiFunction, ...args) => {
    apiFunction(...args).then((data) => {
      console.log(apiFunction.name);
      console.log(data);
    });
  };

  return (
    <>
      <h1>Test Page</h1>

      {testData.map((args) => (
        <button onClick={() => logApi(...args)}>{args[0].name}</button>
      ))}
    </>
  );
}

export default Test;
