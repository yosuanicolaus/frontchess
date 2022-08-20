import axios from "axios";
import { useAuth } from "./auth";

axios.defaults.baseURL = "http://localhost:3001/";

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
  const { user } = useAuth();

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
      const { uid } = user;
      return apiPost("/game/new", { uid, timeControl });
    },

    postGameJoin: function (id) {
      const { uid } = user;
      return apiPost(`/game/${id}/join`, { uid });
    },

    postGameLeave: function (id) {
      const { uid } = user;
      return apiPost(`/game/${id}/leave`, { uid });
    },

    postGameReady: function (id) {
      const { uid } = user;
      return apiPost(`/game/${id}/ready`, { uid });
    },

    postGameStart: function (id) {
      const { uid } = user;
      return apiPost(`/game/${id}/start`, { uid });
    },

    getUser: function () {
      const { uid } = user;
      return apiGet(`/user/${uid}`);
    },

    postChatNew: function () {
      return apiPost("/chat/new");
    },

    getChat: function (id) {
      return apiGet(`/chat/${id}`);
    },

    postChatNewMessage: function (id, text) {
      const username = user.name;
      const uid = user.uid;
      return apiPost(`/chat/${id}/new-message`, { text, username, uid });
    },
  };
}

export function firstSignIn(uid) {
  return apiPost("/user/new", { uid });
}
