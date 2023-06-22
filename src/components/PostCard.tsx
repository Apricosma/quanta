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

interface PostCardProps {
  post: string;
  user: {
    id: string;
    name: string | null | undefined;
    photoURL: string | null | undefined;
  };
  timestamp: number;
  imageUrl?: string | null;
}

// convert timestamp to date and include time
const convertTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

const PostCard: React.FC<PostCardProps> = ({
  post,
  user,
  timestamp,
  imageUrl,
}) => (
  <Card
    key={timestamp}
    sx={{ my: 2, mx: 4, p: 2, ...cardStyleProps }}
    variant="outlined"
  >
    <CardContent sx={{ display: "flex", flexDirection: "column", p: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Avatar
          sx={{ mr: 2, width: 58, height: 58 }}
          src={user?.photoURL || ""}
        />
        <Typography variant="h6">{user.name}</Typography>
      </Box>
      <Typography variant="body1">{post}</Typography>
      <Divider sx={{ my: 2 }}></Divider>
      <Box sx={{ maxWidth: "100%" }}>
        {imageUrl && (
          <img src={imageUrl} alt="post" style={{ maxWidth: "100%" }} />
        )}
      </Box>
    </CardContent>
    <Typography sx={{ ml: 1 }} variant="caption" color="grey">
      {convertTimestamp(timestamp)}
    </Typography>
  </Card>
);

export default PostCard;
