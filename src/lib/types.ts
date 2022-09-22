export interface User {
  _id: string;
  uid: string;
  name: string;
  elo: number;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  _id: string;
  text: string;
  username: string;
  uid: string;
  createdAt: string;
  updatedAt: string;
}

export interface Chat {
  _id: string;
  messages: Message[];
}

export interface Player {
  _id: string;
  uid: string;
  name: string;
  elo: number;
  active: boolean;
  online: boolean;
  time: number;
}

export interface Move {
  from: {
    rank: number;
    file: number;
  };
  to: {
    rank: number;
    file: number;
  };
  piece: string;
  faction: "w" | "b";
  san: string;
  lan: string;
  uci: string;
  fenResult: string;
  capture?: true;
}

export type GameState =
  | "empty"
  | "waiting"
  | "pending"
  | "ready"
  | "playing"
  | "ended";

export type GameStatus = "normal" | "check" | "end";

export interface Game {
  _id: string;
  timeControl: string;
  state: GameState;
  status: GameStatus;
  turn: "w" | "b";
  fen: string;
  board: string[][];
  moves: Move[];
  history: string[];
  records: number[];
  pgn: string;
  pwhite: Player;
  pblack: Player;
  user0: User;
  user1: User;
  chat: string;
}
