import axios from "axios";

export const registerUser = async ({ commit }, user) => {
  commit("setLoading", true);
  await axios
    .post(`/auth/register`, {
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
    })
    .then((res) => {
      commit("setUser", res.data);
      commit("setToken", res.data.token);
      commit("setMessage", {
        text: "Successfully logged in",
        type: "success",
      });
      commit("setLoading", false);
      commit("hideDialog");
    })
    .catch((err) => {
      commit("setLoading", false);
      switch (err.response.status) {
        case 400:
          commit("setMessage", {
            text: err.response.data.message,
            type: "error",
          });
          break;
        case 409:
          console.log(err);
          commit("setMessage", {
            text: err.response.data.message,
            type: "error",
          });
          break;
        default:
          commit("setMessage", {
            text: "Something went wrong",
            type: "error",
          });
          break;
      }
    });
};

export const loginUser = async ({ commit }, user) => {
  let loginData = {
    password: user.password,
  };

  if (user.username) loginData["username"] = user.username;
  if (user.email) loginData["email"] = user.email;

  console.log("HERE");

  await axios
    .post(`/auth/login`, loginData)
    .then((res) => {
      if (res.data.id && res.data.token) {
        commit("setUser", res.data.id);
        commit("setToken", res.data.token);
        commit("setMessage", {
          text: "Successfully logged in",
          type: "success",
        });
      } else {
        commit("setMessage", {
          text: "Something went wrong",
          type: "success",
        });
      }

      commit("setLoading", false);
      commit("hideDialog");
    })
    .catch((err) => {
      commit("setLoading", false);
      switch (err.response.status) {
        case 400:
          commit("setMessage", {
            text: err.response.data.message,
            type: "error",
          });
          break;
        case 409:
          console.log(err);
          commit("setMessage", {
            text: err.response.data.message,
            type: "error",
          });
          break;
        case 404:
          console.log(err);
          commit("setMessage", {
            text: err.response.data.message,
            type: "error",
          });
          break;
        default:
          commit("setMessage", {
            text: "Something went wrong",
            type: "error",
          });
          break;
      }
    });
};
