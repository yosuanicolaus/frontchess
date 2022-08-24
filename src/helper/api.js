import axios from "axios";
import { useAuth } from "./auth";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://desolate-caverns-62809.herokuapp.com/"
    : "http://localhost:3001/";

axios.defaults.baseURL = API_URL;

const apiGet = async (path) => {
  try {
    const response = await axios.get(path);
    const data = await response.data;
    return data;
  } catch (error) {
    return error.response.data;
  }
};

const apiPost = async (path, postData) => {
  try {
    const response = await axios.post(path, postData);
    const data = await response.data;
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export function useApi() {
  const { username, uid } = useAuth();

  return {
    getAllData: function () {
      return apiGet("/");
    },

    getGame: function (id) {
      return apiGet(`/game/${id}`);
    },

    getGameRandomOpen: function () {
      return apiGet("/game/random/open");
    },

    postGameNew: function (timeControl) {
      return apiPost("/game/new", { timeControl });
    },

    postGameJoin: function (id) {
      return apiPost(`/game/${id}/join`, { uid });
    },

    postGameLeave: function (id) {
      return apiPost(`/game/${id}/leave`, { uid });
    },

    postGameReady: function (id) {
      return apiPost(`/game/${id}/ready`, { uid });
    },

    postGameStart: function (id) {
      return apiPost(`/game/${id}/start`, { uid });
    },

    getUser: function () {
      return apiGet(`/user/${uid}`);
    },

    postChatNew: function () {
      return apiPost("/chat/new");
    },

    getChat: function (id) {
      return apiGet(`/chat/${id}`);
    },

    postChatNewMessage: function (id, text) {
      return apiPost(`/chat/${id}/new-message`, { text, username, uid });
    },
  };
}

export function firstSignIn(uid) {
  return apiPost("/user/new", { uid });
}

export function firstLogIn(uid) {
  return apiGet(`/user/${uid}`);
}
