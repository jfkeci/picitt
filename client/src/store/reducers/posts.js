import axios from "axios";

export const fetchPosts = async ({ commit }) => {
  commit("setLoading", true);
  await axios
    .get("/posts", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((res) => {
      console.log("POSTS", res.data);
      commit("setPosts", res.data);
      commit("setLoading", false);
    })
    .catch((err) => {
      commit("setLoading", false);
      switch (err.response.status) {
        case 401:
          commit("setMessage", {
            text: "Something went wrong",
            type: "error",
          });
          break;
        case 404:
          commit("setMessage", {
            text: "Mo posts found",
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

export const getPost = async ({ commit }, id) => {
  await axios
    .get(`/posts/${id}`)
    .then((res) => {
      commit("setCurrentPost", res.data);
      commit("setLoading", false);
    })
    .catch((err) => {
      commit("setLoading", false);
      switch (err.response.status) {
        case 404:
          commit("setMessage", {
            text: "No post found",
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

export const saveNewPost = async ({ commit }, post) => {
  commit("setLoading", true);
  await axios
    .post("/posts", post)
    .then((res) => {
      console.log(res);
      commit("hideDialog");
      commit("addPost", res.data);
      commit("setLoading", false);
      commit("setMessage", {
        text: "Successfully saved",
        type: "success",
      });
    })
    .catch(() => {
      commit("setLoading", false);
      commit("setMessage", {
        text: "Something went wrong",
        type: "error",
      });
    });
};

export const updatePost = async (state, post) => {
  state.commit("setLoading", true);
  await axios
    .patch(`/posts/${post._id}`, post)
    .then((res) => {
      console.log(res);
      state.commit("hideDialog");
      // state.commit('replacePost', res.data)
      state.commit("setLoading", false);
      state.commit("setMessage", {
        text: "Successfully updated",
        type: "success",
      });
    })
    .catch(() => {
      state.commit("setLoading", false);
      state.commit("setMessage", {
        text: "Something went wrong",
        type: "error",
      });
    });
};

export const toggleLike = async (state, post) => {
  state.commit("setLoading", false);
  if (!state.getters.isLoggedIn) {
    state.commit("setAction", "login");
    state.commit("showDialog");
    return;
  }
  await axios
    .patch(`/posts/like/${post._id}/${state.getters.getUser}`)
    .then((res) => {
      let updatedPost = res.data;
      state.commit("replacePost", updatedPost);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deletePost = async (state, postId) => {
  state.commit("setLoading", true);

  await axios
    .delete(`/posts/${postId}`)
    .then(() => {
      state.commit("deletePost", postId);
      state.commit("setLoading", false);
      state.commit("hideDialog");
    })
    .catch((err) => {
      state.commit("setLoading", false);
      state.commit("hideDialog");
      switch (err.response.status) {
        case 404:
          state.commit("setMessage", {
            text: err.response.data.message,
            type: "error",
          });
          break;
        default:
          state.commit("setMessage", {
            text: "Something went wrong",
            type: "error",
          });
          break;
      }
    });
};

export const searchPosts = async (state, filter) => {
  await axios
    .get("/posts/search?filter=" + filter)
    .then((res) => {
      state.commit("setSearchResults", res.data);
      console.log(filter, res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
