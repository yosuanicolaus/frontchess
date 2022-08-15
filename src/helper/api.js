import axios from "axios";
import { auth } from "./auth";

// axios = axios.create({ baseURL: "http://localhost:3001/" });
axios.defaults.baseURL = "http://localhost:3001/";

export async function getAllGames() {
  const response = await axios.get("/");
  const data = await response.data;
  return data;
}

export async function postGameNew() {
  const username = auth.currentUser.displayName || auth.currentUser.uid;
  const response = await axios.post("/game/new", { username });
  const data = await response.data;
  return data;
}

export async function apiTest() {
  const response = await axios.get("/test");
  const data = await response.data;
  return data;
}
