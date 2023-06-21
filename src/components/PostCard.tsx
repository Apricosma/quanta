import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

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
    sx={{
      my: 2,
      mx: 4,
      p: 2,
      background: "rgba(167, 157, 170, 0.13)",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      backdropFilter: "blur(14.5px)",
      border: "1px solid rgba(167, 157, 170, 0.48)"
    }}
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
      {imageUrl && <img src={imageUrl} alt="post" width="100%" height="100%" />}
    </CardContent>
    <Typography sx={{ ml: 1 }} variant="caption" color="grey">
      {convertTimestamp(timestamp)}
    </Typography>
  </Card>
);

export default PostCard;
