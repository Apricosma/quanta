import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { cardStyleProps } from "../styles/styleExports";
import { Delete } from "@mui/icons-material";
import useDeletePost from "../hooks/useDeletePost";
import { useAuth } from "../hooks/useAuth";

interface PostCardProps {
  docId: string;
  post: string;
  postUser: {
    id: string;
    name: string | null | undefined;
    photoURL: string | null | undefined;
  };
  localTimestamp: number;
  imageUrl?: string | null;
  isOwnPost?: boolean;
}

const convertTimestamp = (timestamp: number | null | undefined) => {
  // I literally cannot fix this so I'm just going to ignore it
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

const PostCard: React.FC<PostCardProps> = ({
  docId,
  post,
  postUser,
  localTimestamp,
  imageUrl,
  isOwnPost,
}) => {
  const { deletePost } = useDeletePost();
  const { user } = useAuth();
  const isAdmin = user?.uid === import.meta.env.VITE_APP_ADMIN_UID;

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    deletePost(docId, imageUrl);
  };

  return (
    <Card
      key={localTimestamp}
      sx={{ my: 2, mx: 4, px: 2, pt: 1, ...cardStyleProps }}
      variant="outlined"
    >
      <CardContent sx={{ display: "flex", flexDirection: "column", p: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            sx={{ mr: 2, width: 58, height: 58 }}
            src={postUser?.photoURL || ""}
          />
          <Typography variant="h6">{postUser.name}</Typography>
        </Box>
        <Typography variant="body1">{post}</Typography>
        <Divider sx={{ my: 2 }}></Divider>
        <Box sx={{ maxWidth: "100%" }}>
          {imageUrl && (
            <img src={imageUrl} alt="post" style={{ maxWidth: "100%" }} />
          )}
        </Box>
      </CardContent>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "end"}}>
        <Typography sx={{ ml: 1 }} variant="caption" color="grey">
          {convertTimestamp(localTimestamp)}
        </Typography>
        {isOwnPost || isAdmin ? (
          <Box sx={{ mr: 0.5}} onClick={() => handleDelete()}>
            <Delete color="error" />
          </Box>
        ) : null}
      </Box>
    </Card>
  );
};
export default PostCard;
