import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
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

  <Card key={timestamp} sx={{ my: 2, mx: 4, p: 2 }}>
    <CardContent sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2}}>
        <Avatar
          sx={{ mr: 2, width: 58, height: 58 }}
          src={user?.photoURL || ""}
        />
        <Typography variant="h6">{user.name}</Typography>
      </Box>
      <Typography variant="body1">{post}</Typography>
      <Divider sx={{ my: 2 }}></Divider>
      {imageUrl && (
        <img src={imageUrl} alt="post" width="100%" height="100%" />
      )}
    </CardContent>
    <Typography sx={{ ml: 2 }} variant="caption">{convertTimestamp(timestamp)}</Typography>
  </Card>


);

export default PostCard;
