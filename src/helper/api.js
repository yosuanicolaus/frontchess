import axios from "axios";

// axios = axios.create({ baseURL: "http://localhost:3001/" });
axios.defaults.baseURL = "http://localhost:3001/";

export async function getAllGames() {
  const response = await axios.get("/");
  const data = await response.data;
  return data;
}

export async function apiTest() {
  const response = await axios.get("/test");
  const data = await response.data;
  return data;
}
