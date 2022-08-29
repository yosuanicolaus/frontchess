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

export interface GameModel {
  _id: string;
  timeControl: string;
  state: "empty" | "waiting" | "pending" | "ready" | "playing" | "ended";
  status: "normal" | "check" | "end";
  turn: "w" | "b";
  fen: string;
  board: string[][];
  moves: Move[];
  history: string[];
  pgn: string;
  pwhite: Player;
  pblack: Player;
  user0: User;
  user1: User;
  chat: string;
}
