import { io } from "socket.io-client";

const socket = io("http://localhost:3003/");

socket.on("error", (message) => {
  console.log("error handled in /helper/socket.js");
  console.log(message);
});

export { socket };
