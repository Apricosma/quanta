import React, { useEffect } from "react";
import { Container, Typography } from "@mui/material";
import PostForm from "./PostForm";
import useFetchPosts from "../hooks/useFetchPosts";
import useCreatePost from "../hooks/useCreatePost";
import { useAuth } from "../hooks/useAuth";
import PostCard from "./PostCard";
import { containerStyleProps } from "../styles/styleExports";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

const Feed: React.FC = () => {
  const { user } = useAuth();
  const [posts, isLoading, fetchMorePosts] = useFetchPosts();

  const createPost = useCreatePost();

  const handleIntersect = () => {
    if (!isLoading) {
      fetchMorePosts();
    }
  };

  const observerOptions = {
    root: null,
    rootMargin: "20px",
    threshold: 1.0,
  };

  const [loaderRef, isIntersecting] = useIntersectionObserver(observerOptions);

  useEffect(() => {
    if (isIntersecting) {
      handleIntersect();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIntersecting]);

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
      <div ref={loaderRef} />
    </Container>
  );
};

export default Feed;
