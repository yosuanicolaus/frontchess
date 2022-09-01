import axios, { AxiosError } from "axios";
import { useAuth } from "./auth";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://desolate-caverns-62809.herokuapp.com/"
    : "http://localhost:3001/";

axios.defaults.baseURL = API_URL;

const handleError = (error: unknown) => {
  if (error && error instanceof AxiosError) {
    return error.response?.data;
  } else {
    console.log(error);
  }
};

const apiGet = async (path: string) => {
  try {
    const response = await axios.get(path);
    const data = await response.data;
    return data;
  } catch (error) {
    return handleError(error);
  }
};

const apiPost = async (path: string, postData?: Object) => {
  try {
    const response = await axios.post(path, postData);
    const data = await response.data;
    return data;
  } catch (error) {
    return handleError(error);
  }
};

export function useApi() {
  const { name, uid } = useAuth();

  return {
    getAllData: function () {
      return apiGet("/");
    },

    getGame: function (id: string) {
      return apiGet(`/game/${id}`);
    },

    getGameRandomOpen: function () {
      return apiGet("/game/random/open");
    },

    postGameNew: function (timeControl: string) {
      return apiPost("/game/new", { timeControl });
    },

    postGameJoin: function (id: string) {
      return apiPost(`/game/${id}/join`, { uid });
    },

    postGameLeave: function (id: string) {
      return apiPost(`/game/${id}/leave`, { uid });
    },

    postGameReady: function (id: string) {
      return apiPost(`/game/${id}/ready`, { uid });
    },

    postGameStart: function (id: string) {
      return apiPost(`/game/${id}/start`, { uid });
    },

    getUser: function () {
      return apiGet(`/user/${uid}`);
    },

    getUserByName: function (name: string) {
      return apiGet(`/user/name/${name}`);
    },

    postChatNew: function () {
      return apiPost("/chat/new");
    },

    getChat: function (id: string) {
      return apiGet(`/chat/${id}`);
    },

    postChatNewMessage: function (id: string, text: string) {
      return apiPost(`/chat/${id}/new-message`, { text, username: name, uid });
    },
  };
}

export function firstSignIn(uid: string) {
  return apiPost("/user/new", { uid });
}

export function firstLogIn(uid: string) {
  return apiGet(`/user/${uid}`);
}
