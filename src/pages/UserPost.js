import { Button, Skeleton, Stack, TextField, Typography } from "@mui/material";
import { toast } from "material-react-toastify";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getPost,
  deletePost,
  setEdit,
  updatePost,
} from "../redux/features/postSlice";

const UserPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post, loading, error, edit, body, title } = useSelector(
    (state) => state.app
  );
  const [userId, setUserId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  const fetchNewPost = () => {
    if (!userId) {
      toast.error("Please Enter Post number");
    } else {
      dispatch(getPost(userId));
      setUserId("");
    }
  };

  useEffect(() => {
    setEditTitle(title);
    setEditBody(body);
  }, [body, title]);

  const update = () => {
    dispatch(
      updatePost({
        id: post.id,
        title: editTitle,
        body: editBody,
      })
    );
    dispatch(
      setEdit({
        edit: false,
        body: post.body,
        title: post.title,
      })
    );
  };

  return (
    <>
      <Stack mt={10} textAlign="center" width="30%" mx="auto">
        <Typography gutterBottom variant="h4">
          Fetch Post
        </Typography>
        <TextField
          label="Enter id"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <Stack direction="row" mt={2} spacing={3} mx="auto">
          <Button onClick={fetchNewPost} variant="contained">
            Fetch User Post
          </Button>
          <Button onClick={() => navigate("/create")} variant="contained">
            Create User Post
          </Button>
        </Stack>
      </Stack>

      {error ? (
        <Stack mx="auto" mt={2}>
          <Typography color="warning" variant="h5">
            {error}
          </Typography>
        </Stack>
      ) : (
        <Stack mx="auto" mt={3} width="50%">
          {edit ? (
            //edit post
            <Stack spacing={2}>
              <TextField
                label="Title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <TextField
                multiline
                maxRows={4}
                label="Post body"
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
              />
              <Stack direction="row" spacing={2}>
                <Button
                  color="warning"
                  variant="outlined"
                  onClick={() =>
                    dispatch(
                      setEdit({
                        edit: false,
                        body: post.body,
                        title: post.title,
                      })
                    )
                  }
                >
                  Cancel
                </Button>
                <Button color="success" variant="contained" onClick={update}>
                  Save
                </Button>
              </Stack>
            </Stack>
          ) : (
            // display post
            <Stack>
              <Typography textAlign="center" variant="h4">
                {loading ? <Skeleton /> : post.title}
              </Typography>
              <Typography textAlign="center" variant="body1">
                {loading ? <Skeleton /> : post.body}
              </Typography>
              <Typography
                textAlign="center"
                variant="h6"
                display={Object.keys(post).length === 0 ? "none" : "block"}
              >
                {loading ? <Skeleton /> : "User Id : " + post.id}
              </Typography>

              {/* buttons */}
              <Stack
                mx="auto"
                mt={3}
                direction="row"
                spacing={2}
                display={Object.keys(post).length === 0 ? "none" : "block"}
              >
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => dispatch(deletePost(post.id))}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  onClick={() =>
                    dispatch(
                      setEdit({
                        edit: true,
                        body: post.body,
                        title: post.title,
                      })
                    )
                  }
                >
                  Edit
                </Button>
              </Stack>
            </Stack>
          )}
        </Stack>
      )}
    </>
  );
};

export default UserPost;
