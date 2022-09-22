import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRef } from "react";
import Loading from "../components/Loading";
import { useAuth } from "../lib/auth";
import { useChat } from "../lib/chat";
import { Message } from "../lib/types";
import { useGameDB } from "./GameHooks";

function GameChat() {
  const { game } = useGameDB();
  const chatID = game.chat;
  const { chat, sendMessage } = useChat(chatID);
  const [textInput, setTextInput] = useState("");
  const endMessageRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = textInput.trim();
    if (!text) return;
    setLoading(true);
    sendMessage(text);
    setTextInput("");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  };

  useEffect(() => {
    endMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    setLoading(false);
  }, [chat]);

  return (
    <section className="col container-fluid text-bg-primary d-md-flex flex-column d-none border-end border-5 border-primary ps-3">
      <h5 className="row mb-1 px-3 py-2 text-bg-light">Chat</h5>

      {chat ? (
        <div
          className="row px-1 flex-grow-1 bg-secondary d-block overflow-auto"
          style={{ overflowY: "auto", height: 0 }}
        >
          {chat.messages.map((message) => (
            <ChatMessage message={message} key={message._id} />
          ))}
          {loading && <Loading text={"sending message..."} />}
          <div ref={endMessageRef} />
        </div>
      ) : (
        <div className="row text-bg-secondary d-flex flex-grow-1">
          <div className="col my-auto text-center">
            <Loading text={"getting chat..."} />
          </div>
        </div>
      )}

      <form className="row text-bg-dark mt-1 py-1" onSubmit={handleSend}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            onChange={handleInputChange}
            value={textInput}
          />
          <button
            className="btn btn-outline-light btn-sm"
            disabled={!chat || loading}
          >
            Send
          </button>
        </div>
      </form>
    </section>
  );
}

function ChatMessage({ message }: { message: Message }) {
  const { uid } = useAuth();
  const isMe = message.uid === uid;
  const date = new Date(message.createdAt);
  const time = date.toLocaleTimeString();

  return (
    <div className="my-1 text-bg-light small rounded d-flex flex-column">
      {isMe ? <strong>You</strong> : <strong>{message.username}</strong>}
      <div>{message.text}</div>
      <em className="opacity-50 ms-auto">{time}</em>
    </div>
  );
}

export default GameChat;
