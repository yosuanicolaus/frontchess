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
