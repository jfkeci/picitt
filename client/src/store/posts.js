import {
  fetchPosts,
  saveNewPost,
  updatePost,
  toggleLike,
  getPost,
  deletePost,
  searchPosts,
} from "./reducers/posts.js";
import {
  commentPost,
  deleteComment,
  updateComment,
} from "./reducers/comments.js";

export default {
  state: {
    currentPost: null,
    dialogPost: null,
    posts: [],
    searchResults: [],
  },
  mutations: {
    setCurrentPost(state, currentPost) {
      state.currentPost = currentPost;
    },
    setDialogPost(state, dialogPost) {
      state.dialogPost = dialogPost;
    },
    setPosts(state, posts) {
      state.posts = posts;
    },
    addPost(state, post) {
      state.posts = [post, ...state.posts];
    },
    updatePost(state, post) {
      let index = state.posts.findIndex((obj) => obj._id == post._id);
      state.posts[index] = post;
    },
    deletePost(state, postId) {
      state.posts = state.posts.filter((post) => post._id != postId);
    },
    addComment(state, comment) {
      state.currentPost.comments.push(comment);
    },
    replacePost(state, post) {
      let index = state.posts.findIndex((item) => item._id == post._id);
      state.posts[index] = post;
    },
    setSearchResults(state, posts) {
      state.searchResults = posts;
    },
  },
  getters: {
    getCurrentPost: (state) => state.currentPost,
    getDialogPost: (state) => state.dialogPost,
    getPosts: (state) => state.posts,
    getSearchResults: (state) => state.searchResults,
    getPostCount: (state) => state.posts.length,
    hasPosts: (state) => state.posts.length > 0,
  },
  actions: {
    fetchPosts,
    saveNewPost,
    updatePost,
    toggleLike,
    deletePost,
    getPost,
    searchPosts,
    commentPost,
    deleteComment,
    updateComment,
  },
  modules: {},
};
