import { useState, useEffect } from "react";
import { useApi } from "./api";
import { useSocket } from "./socket";

export function useChat(id) {
  const [chat, setChat] = useState();
  const socket = useSocket(id);
  const { getChat } = useApi();

  useEffect(() => {
    if (!id || !socket || !getChat) return;
    getChat(id).then((chat) => {
      setChat(chat);
    });

    socket.on("update-chat", (chat) => {
      console.log("updating chat state");
      setChat(chat);
    });

    return () => {
      socket.off("update-chat");
      socket.off("new-message");
    };
    // eslint-disable-next-line
  }, []);

  return {
    chat,

    sendMessage: function (text) {
      socket.emit("new-message", { id, text });
    },
  };
}
