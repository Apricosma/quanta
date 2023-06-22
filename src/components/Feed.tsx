import React, { useRef, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import PostForm from "./PostForm";
import useFetchPosts from "../hooks/useFetchPosts";
import useCreatePost from "../hooks/useCreatePost";
import { useAuth } from "../hooks/useAuth";
import PostCard from "./PostCard";
import { containerStyleProps } from "../styles/styleExports";

const Feed: React.FC = () => {
  const { user } = useAuth();
  const posts = useFetchPosts();
  console.log(posts);

  const createPost = useCreatePost();

  const loader = useRef<HTMLDivElement | null>(null);

  const handleObserver: IntersectionObserverCallback = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      // Add more posts if needed
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    // Create an intersection observer
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);

  return (
    <Container maxWidth="md" sx={{ ...containerStyleProps, mt: 4, pb: 2 }}>
      <PostForm onPostSubmit={createPost} />
      {user ? (
        posts.map(({ post, user, localTimeStamp, imageUrl }, index) => (
          <PostCard
            key={index}
            post={post}
            user={user}
            timestamp={localTimeStamp}
            imageUrl={imageUrl}
          />
        ))
      ) : (
        <Typography variant="body2">Please log in to view the feed.</Typography>
      )}
      <div ref={loader} />
    </Container>
  );
};

export default Feed;
