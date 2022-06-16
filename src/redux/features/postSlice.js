import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPost = createAsyncThunk("post/getPost", async (id) => {
  // return await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(
  //   (res) => res.json()
  // );
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return response.data;
});

export const deletePost = createAsyncThunk("post/deletePost", async (id) => {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
});

export const createPost = createAsyncThunk("post/createPost", async (post) => {
  return fetch(`https://jsonplaceholder.typicode.com/posts/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      title: post.title,
      body: post.body,
    }),
  }).then((res) => res.json());
});

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ id, body, title }) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
      }),
    }).then((res) => res.json());
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    post: {},
    loading: false,
    error: null,
    edit: false,
    body: "", //only updating the body
    title: "",
  },
  reducers: {
    setEdit: (state, action) => {
      state.edit = action.payload.edit;
      state.body = action.payload.body;
      state.title = action.payload.title;
    },
  },
  extraReducers: {
    //get post
    [getPost.pending]: (state, action) => {
      state.loading = true;
    },
    [getPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = action.payload;
      state.error = null;
    },
    [getPost.rejected]: (state, action) => {
      console.log(action);
      state.loading = false;
      //state.error = action.error.message;
      state.error = "No Post Found...";
    },

    //delete post
    [deletePost.pending]: (state, action) => {
      state.loading = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = action.payload;
    },
    [deletePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //create post
    [createPost.pending]: (state, action) => {
      state.loading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = action.payload;
    },
    [createPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //update post
    [updatePost.pending]: (state, action) => {
      state.loading = true;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = action.payload;
    },
    [updatePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setEdit } = postSlice.actions;
export default postSlice.reducer;
