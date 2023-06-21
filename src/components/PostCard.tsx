import React from "react";
import { Avatar, Card, CardContent, Typography } from "@mui/material";

interface PostCardProps {
  post: string;
  user: {
    id: string;
    name: string | null | undefined;
    photoURL: string | null | undefined;
  };
  timestamp: number;
}

// convert timestamp to date and include time
const convertTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

const PostCard: React.FC<PostCardProps> = ({ post, user, timestamp }) => (
  <Card key={timestamp} sx={{ my: 2, mx: 4, p: 2 }}>
    <CardContent sx={{ display: "flex" }}>
      <Avatar
        sx={{ mr: 4, width: 58, height: 58 }}
        src={user?.photoURL || ""}
      />
      <Typography variant="body2">{`${user.name}: ${post}`}</Typography>
    </CardContent>
    <Typography variant="caption">{convertTimestamp(timestamp)}</Typography>
  </Card>
);

export default PostCard;
