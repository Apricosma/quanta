import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { TextField, Button, CircularProgress, Box, Stack } from "@mui/material";
import useImageUploader from "../hooks/useImageUploader";

interface PostFormProps {
  onPostSubmit: (data: {
    post: string;
    user: {
      id: string;
      name: string | null | undefined;
      photoURL: string | null | undefined;
    };
    imageUrl: string | null;
  }) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onPostSubmit }) => {
  const [post, setPost] = useState("");
  const { user } = useAuth();

  // image handling
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { uploadImage, uploadProgress } = useImageUploader();
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) {
      console.log("No user signed in");
      return;
    }

    try {
      let imageUrl = null;
      if (imageFile) {
        setUploading(true);
        imageUrl = await uploadImage(imageFile);

        // cleanup
        setUploading(false);
        setImageFile(null);
      }

      const postData = {
        post,
        user: {
          id: user.uid,
          name: user.displayName || null,
          photoURL: user.photoURL || null,
        },
        imageUrl,
      };

      onPostSubmit(postData);
      setPost("");
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setImageFile(file || null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack sx={{ mx: 4, mt: 4, display: "flex" }}>
        <TextField
          value={post}
          onChange={(e) => setPost(e.target.value)}
          placeholder="What's happening?"
          multiline={true}
          fullWidth={true}
          minRows={4}
          sx={{ mb: 2 }}
          color="primary"
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <input
            className="imageInput"
            type="file"
            onChange={handleImageChange}
          />
          <Button sx={{px: 4}} variant="contained" type="submit" disabled={!user}>
            Post
          </Button>
          {uploading && <CircularProgress size={20} />}
        </Box>
      </Stack>
    </form>
  );
};

export default PostForm;
