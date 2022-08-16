import axios from "axios";
import { auth } from "./auth";

// axios = axios.create({ baseURL: "http://localhost:3001/" });
axios.defaults.baseURL = "http://localhost:3001/";

export async function getAllGames() {
  return apiGet("/");
}

export async function postGameNew(timeControl) {
  const user = auth.currentUser;
  const username = user.displayName || user.uid;
  return apiPost("/game/new", { username, timeControl });
}

export async function deleteGame(gameID) {
  // TODO:
  // backend: create api route /delete/game/:id
  // then call that route here
  console.log("deleted game with id", gameID);
}

export async function getGameByID(gameID) {
  return apiGet(`/game/${gameID}`);
}

export async function apiTest() {
  return apiGet("/test");
}

async function apiGet(path) {
  try {
    const response = await axios.get(path);
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function apiPost(path, postData) {
  try {
    const response = await axios.post(path, postData);
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}
