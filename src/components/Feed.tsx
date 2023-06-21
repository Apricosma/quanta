import React, { useState, useEffect, useRef } from "react";
import { Container, Typography } from "@mui/material";
import PostForm from "./PostForm";
import { firestore } from "../services/firebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import PostCard from "./PostCard";

const db = firestore;

interface User {
  id: string;
  name: string | null | undefined;
  photoURL: string | null | undefined;
}

interface Post {
  post: string;
  user: User;
  localTimeStamp: number;
  serverTimestamp: {
    seconds: number;
    nanoseconds: number;
  };
  imageUrl?: string | null;
}

const Feed: React.FC = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);

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

  useEffect(() => {
    const q = query(
      collection(db, "posts"),
      orderBy("timestamp", "desc"),
      limit(10)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedPosts = snapshot.docs.map(
        (doc) =>
          doc.data() as {
            post: string;
            user: User;
            localTimeStamp: number;
            serverTimestamp: {
              seconds: number;
              nanoseconds: number;
            };
            imageUrl?: string | null;
          }
      );
      setPosts(updatedPosts);
      console.log("Triggered");
    });

    return () => unsubscribe();
  }, []);

  const handlePostSubmit = async (data: {
    post: string;
    user: User;
    imageUrl: string | null;
  }) => {
    const { post, user, imageUrl } = data;

    const postData = {
      post,
      user,
      imageUrl,
      timestamp: serverTimestamp(),
      localTimeStamp: Date.now(),
    };
    try {
      const docRef = await addDoc(collection(db, "posts"), postData);
      console.log("Post added with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding post: ", error);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        background: "rgba(167, 157, 170, 0.13)",
        borderRadius: "16px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(167, 157, 170, 0.48)",
        mt: 4,
        pb: 2,
      }}
    >
      <PostForm onPostSubmit={handlePostSubmit} />
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
