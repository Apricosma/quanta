import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { firestore } from "../services/firebaseConfig";

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

const db = firestore;

const useFetchPosts = (): Post[] => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "posts"),
      orderBy("timestamp", "desc"),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedPosts = snapshot.docs.map((doc) => doc.data() as Post);
      setPosts(updatedPosts);
    });

    return () => unsubscribe();
  }, []);

  return posts;
};

export default useFetchPosts;
