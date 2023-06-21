import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Typography,
} from "@mui/material";
import PostForm from "./PostForm";
import { firestore } from "../services/firebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
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
  timestamp: number;
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
            timestamp: number;
          }
      );
      setPosts(updatedPosts);
    });

    return () => unsubscribe();
  }, []);

  const handlePostSubmit = async (data: {
    post: string;
    user: User;
  }) => {
    const { post, user } = data;
    const timestamp = Date.now();
    const postData = {
      post,
      user,
      timestamp,
    };
    try {
      const docRef = await addDoc(collection(db, "posts"), postData);
      console.log("Post added with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding post: ", error);
    }
  };

  return (
    <Container>
      <PostForm onPostSubmit={handlePostSubmit} />
      {user ? (
        posts.map(({ post, user, timestamp }) => (
          <PostCard key={timestamp} post={post} user={user} timestamp={timestamp} />
        ))
      ) : (
        <Typography variant="body2">Please log in to view the feed.</Typography>
      )}
      <div ref={loader} />
    </Container>
  );
};

export default Feed;
