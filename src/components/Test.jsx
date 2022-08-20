import { useApi } from "../helper/api";
import React, { useState } from "react";

function Test() {
  const [log, setLog] = useState("");
  const {
    getAllData,
    getChat,
    getGame,
    getGameRandomOpen,
    getUser,
    postChatNew,
    postChatNewMessage,
    postGameJoin,
    postGameLeave,
    postGameNew,
    postGameReady,
    postGameStart,
  } = useApi();

  const testData = [
    [getAllData],
    [getGame, "MeUWJyMeS6"],
    [getGameRandomOpen],
    [postGameNew, "10+5"],
    [postGameJoin, "MeUWJyMeS6"],
    [postGameLeave, "MeUWJyMeS6"],
    [postGameReady, "MeUWJyMeS6"],
    [postGameStart, "MeUWJyMeS6"],
    [getUser, "n5AmNbrFeagvCS1cpffrEWAgqNw2"],
    [postChatNew],
    [getChat, "62feff3bf529befef32e3e28"],
    [postChatNewMessage, "62feff3bf529befef32e3e28", "hello"],
  ];

  const logApi = (apiFunction, ...args) => {
    apiFunction(...args).then((data) => {
      console.log(apiFunction.name);
      console.log(...args);
      console.log(data);
      setLog(apiFunction.name + "\n" + JSON.stringify(data, undefined, 2));
    });
  };

  return (
    <>
      <div className="d-flex">
        <main>
          <h1>Test Page</h1>
          {testData.map((args) => (
            <button
              key={args[0].name}
              onClick={() => logApi(...args)}
              className="m-1"
            >
              {args[0].name}
            </button>
          ))}
        </main>

        <textarea
          name="log"
          id="log"
          cols="75"
          rows="30"
          value={log}
          className="font-monospace small"
          readOnly={true}
        />
      </div>
    </>
  );
}

export default Test;
