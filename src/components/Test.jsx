import { apiTest, getAllGames, getGameByID, postGameNew } from "../helper/api";

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

      <button onClick={() => logApi(apiTest)}>apiTest</button>
      <button onClick={() => logApi(getAllGames)}>getAllGames</button>
      <button onClick={() => logApi(getGameByID, "62fae59f4839113851860177")}>
        getGameByID
      </button>
      <button onClick={() => logApi(postGameNew, "12+6")}>postGameNew</button>
    </>
  );
}

export default Test;
