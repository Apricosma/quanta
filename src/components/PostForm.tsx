import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { TextField, Button } from "@mui/material";

interface PostFormProps {
  onPostSubmit: (data: {
    post: string;
    user: { id: string; name: string | null | undefined, photoURL: string | null | undefined };
  }) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onPostSubmit }) => {
  const [post, setPost] = useState<string>("");
  const { user } = useAuth();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (user) {
      onPostSubmit({
        post,
        user: {
          id: user.uid,
          name: user.displayName || null,
          photoURL: user.photoURL || null,
        },
      });
      setPost("");
    } else {
      console.log("No user signed in");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        value={post}
        onChange={(e) => setPost(e.target.value)}
        placeholder="What's happening?"
      />
      <Button type="submit" disabled={!user}>
        Post
      </Button>
    </form>
  );
};

export default PostForm;