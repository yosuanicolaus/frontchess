import axios from "axios";
import { useAuth } from "./auth";

axios.defaults.baseURL = "http://localhost:3001/";

export function useApi() {
  const { user } = useAuth();

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

    postUserNew: function () {
      const { uid } = user;
      return apiPost("/user/new", { uid });
    },

    getUser: function () {
      const { uid } = user;
      return apiGet(`/user/${uid}`);
    },
  };
}
