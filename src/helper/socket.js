import { useEffect } from "react";
import { io } from "socket.io-client";

const SOCKET_URL =
  process.env.NODE_ENV === "production"
    ? "https://desolate-caverns-62809.herokuapp.com/"
    : "http://localhost:3001/";

export const socket = io(SOCKET_URL);

socket.on("log", (message) => {
  console.log(message);
});

socket.on("reload", () => {
  window.location.reload();
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
