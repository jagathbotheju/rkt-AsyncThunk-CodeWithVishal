import { Button, Stack, TextField, Typography, Skeleton } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../redux/features/postSlice";

const Create = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post, loading } = useSelector((state) => state.app);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title);
    console.log(body);
    dispatch(
      createPost({
        title,
        body,
      })
    );
    setTitle("");
    setBody("");
  };

  return (
    <>
      <Stack mt={10} width="40%" mx="auto" spacing={4}>
        <Typography textAlign="center" variant="h4">
          Create Post
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              multiline
              rows={4}
              label="Enter body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </Stack>
          <Stack direction="row" mt={2} spacing={3}>
            <Button onClick={() => navigate("/")} variant="contained">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </form>
      </Stack>

      {Object.keys(post).length !== 0 && (
        <Stack
          mx="auto"
          p={3}
          mt={2}
          width="50%"
          boxShadow={3}
          spacing={2}
          borderRadius={4}
        >
          <Typography variant="h4">
            {loading ? <Skeleton /> : post.id}
          </Typography>
          <Typography variant="h4">
            {loading ? <Skeleton /> : post.title}
          </Typography>
          <Typography variant="body1">
            {loading ? <Skeleton /> : post.body}
          </Typography>
        </Stack>
      )}
    </>
  );
};

export default Create;
