import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  TextField,
  Button,
  CircularProgress,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import useImageUploader from "../hooks/useImageUploader";
import { InsertPhoto } from "@mui/icons-material";

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
  const [error, setError] = useState<string | null>(null);

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

    if (post.trim().length === 0) {
      setError("Enter some text to share!");
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
    setError(null);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    const file = event.target.files[0];
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/avif",
    ];
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      setError("Invalid file type. Please select an image.");
      return;
    }

    if (file.size > maxFileSize) {
      setError("File is too large. Please select an image under 5MB.");
      return;
    }

    setImageFile(file);
    setError(null);
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
          <label htmlFor="imageInput">
            <input
              id="imageInput"
              accept="image/*"
              className="imageInput"
              type="file"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <Button
              sx={{ p: 1, color: "text.secondary" }}
              variant="text"
              component="span"
            >
              <InsertPhoto color="primary" sx={{ mr: 1 }} />
              Upload
            </Button>
          </label>
          {error && <Typography color="error">{error}</Typography>}
          {uploading && <CircularProgress size={20} />}
          <Button
            sx={{ px: 4 }}
            variant="contained"
            type="submit"
            disabled={!user}
          >
            Post
          </Button>
        </Box>
      </Stack>
    </form>
  );
};

export default PostForm;
