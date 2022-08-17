import axios from "axios";
import { auth } from "./auth";

// axios = axios.create({ baseURL: "http://localhost:3001/" });
axios.defaults.baseURL = "http://localhost:3001/";

export function getAllGames() {
  return apiGet("/");
}

export function getGameRandomOpen() {
  return apiGet("/game/random/open");
}

export function postGameNew(timeControl) {
  const user = auth.currentUser;
  const username = user.displayName || user.uid;
  return apiPost("/game/new", { username, timeControl });
}

export function postGameJoin(gameID, username) {
  return apiPost(`/game/${gameID}/join`, { username });
}

export function deleteGame(gameID) {
  // TODO:
  // backend: create api route /delete/game/:id
  // then call that route here
  console.log("deleted game with id", gameID);
}

export function getGame(gameID) {
  return apiGet(`/game/${gameID}`);
}

export function apiTest() {
  return apiGet("/test");
}

async function apiGet(path) {
  try {
    const response = await axios.get(path);
    const data = await response.data;
    return data;
  } catch (error) {
    return error.response.data;
  }
}

async function apiPost(path, postData) {
  try {
    const response = await axios.post(path, postData);
    const data = await response.data;
    return data;
  } catch (error) {
    return error.response.data;
  }
}
