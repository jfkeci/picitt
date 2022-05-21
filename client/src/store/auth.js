import { registerUser, loginUser } from "./reducers/auth.js";
import axios from "axios";

export default {
  state: {
    user: null,
    token: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      user
        ? localStorage.setItem("user", user)
        : localStorage.removeItem("user");
    },
    async setToken(state, token) {
      state.token = token;

      token
        ? localStorage.setItem("token", token)
        : localStorage.removeItem("token");

      axios.defaults.headers.common = { Authorization: `bearer ${token}` };
    },
    logout({ state, commit }) {
      state.user = null;
      localStorage.removeItem("user");

      state.token = null;
      localStorage.removeItem("token");

      commit("setMessage", {
        text: "Successfully logged out",
        type: "success",
      });
    },
  },
  actions: {
    registerUser,
    loginUser,
  },
  getters: {
    getUser: (state) => state.user,
    isLoggedIn: (state) => {
      if (
        localStorage.getItem("user") == null ||
        !localStorage.getItem("user")
      ) {
        state.user == null;
      } else {
        state.user = localStorage.getItem("user");
      }

      if (
        localStorage.getItem("token") == null ||
        !localStorage.getItem("token")
      ) {
        state.token == null;
      } else {
        state.token = localStorage.getItem("token");
        axios.defaults.headers.common = {
          Authorization: `bearer ${state.token}`,
        };
      }

      console.log("IS LOGGED IN", state.user != null && state.token != null);

      return state.user != null && state.token != null;
    },
  },
};
