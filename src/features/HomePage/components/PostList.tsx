import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";
import { Post } from "../../../api/postApi";

const truncateTextLength = (text: string, maxLength: number) => {
  if (maxLength < 0 || !text) return "";

  const truncatedText =
    text.length > maxLength ? `${text.substring(0, maxLength - 3)}...` : text;

  return truncatedText;
};

export interface PostListProps {
  postList?: Post[];
  onDeletedClick?: (id: string) => void;
  onEditClick?: (item: Post) => void;
}

export function PostList({
  postList,
  onDeletedClick,
  onEditClick,
}: PostListProps) {
  return (
    <Stack direction="row" flexWrap="wrap" sx={{ mx: -1 }}>
      {Array.isArray(postList) &&
        postList.map((item, idx) => {
          return (
            <Box
              key={idx}
              sx={{
                width: { xs: "100%", sm: 1 / 2, md: 1 / 3 },
              }}
            >
              <Box sx={{ p: 1, flexGrow: 1 }}>
                <Card
                  sx={{
                    width: "100%",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.imageUrl}
                    alt={item.author}
                  />

                  <CardContent sx={{ height: 115 }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      color="GrayText"
                    >
                      {item.author}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {truncateTextLength(item.description, 80)}
                    </Typography>
                  </CardContent>

                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => onDeletedClick?.(item.id)}
                    >
                      Remove
                    </Button>

                    <Button size="small" onClick={() => onEditClick?.(item)}>
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            </Box>
          );
        })}
    </Stack>
  );
}
