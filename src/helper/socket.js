import { useEffect } from "react";
import { io } from "socket.io-client";

export const socket = io("http://localhost:3003/");

socket.on("log", (message) => {
  console.log(message);
});

export function useSocket(id) {
  useEffect(() => {
    socket.emit("join", { id });

    return () => {
      socket.emit("leave", { id });
    };
    // eslint-disable-next-line
  }, []);

  return socket;
}
