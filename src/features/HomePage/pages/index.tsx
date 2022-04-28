import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { FilterParams, Post } from "../../../api/postApi";
import { usePosts } from "../../../hooks/usePosts";
import { AddEditPost } from "../components/AddEditPost";
import { PostList } from "../components/PostList";

function HomePage() {
  const [params, setParams] = useState<FilterParams>({
    _page: 1,
    _limit: 6,
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post>();
  const { postList, deletedPost, addPost, updatePost } = usePosts(params);

  function handleCloseModal() {
    setShowModal(false);
    setSelectedPost(undefined);
  }
  function handleEditClick(item: Post) {
    setShowModal(true);
    setSelectedPost(item);
  }
  function handleCreateClick() {
    setShowModal(true);
  }
  function handleDeletedClick(id: string) {
    deletedPost(id);
  }
  function handleSubmit(values: Post) {
    console.log({ values });
    if (selectedPost) {
      updatePost({
        id: values.id,
        imageUrl:
          "https://statics.vinpearl.com/canh-dep-viet-nam-2_1634999708.jpg",
        author: values.author,
        description: values.description,
        title: values.title,
      });

      setShowModal(false);
      setSelectedPost(undefined);

      return;
    }

    addPost({
      id: values.id,
      imageUrl: values.imageUrl,
      author: values.author,
      description: values.description,
      title: values.title,
    });

    setShowModal(false);
    setSelectedPost(undefined);
  }

  return (
    <Box>
      <Container>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{ my: 10 }}
        >
          <Typography variant="h3">Post List</Typography>

          <Button onClick={handleCreateClick} variant="contained">
            Add Post
          </Button>
        </Stack>

        <Box sx={{ my: 10 }}>
          <PostList
            postList={postList || []}
            onDeletedClick={handleDeletedClick}
            onEditClick={handleEditClick}
          />
        </Box>
      </Container>

      <Dialog
        open={showModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography component="h1" variant="h6">
              {selectedPost ? "Edit Post" : "Create Post"}
            </Typography>

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={handleCloseModal}
              sx={{ p: 0 }}
            >
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <AddEditPost
            onSubmit={handleSubmit}
            post={selectedPost}
            onCancelClick={handleCloseModal}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default HomePage;
