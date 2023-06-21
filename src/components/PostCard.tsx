import React from "react";
import { Avatar, Card, CardContent, Typography } from "@mui/material";

interface PostCardProps {
  post: string;
  user: { id: string; name: string | null | undefined; photoURL: string | null | undefined };
  timestamp: number;
}

const PostCard: React.FC<PostCardProps> = ({ post, user, timestamp }) => (
  <Card key={timestamp} sx={{ margin: "10px" }}>
    <CardContent>
      <Avatar src={user?.photoURL || ""} />
      <Typography variant="body2">{`${user.name}: ${post}`}</Typography>
    </CardContent>
  </Card>
);

export default PostCard;
