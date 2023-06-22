import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
  DocumentData,
  startAfter,
} from "firebase/firestore";
import { firestore } from "../services/firebaseConfig";
import { IPost as Post } from "../types/IPost";

const db = firestore;

const useFetchPosts = (): [Post[], boolean, () => void] => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastPost, setLastPost] = useState<DocumentData | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, "posts"),
      orderBy("timestamp", "desc"),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedPosts = snapshot.docs.map((doc) => doc.data() as Post);
      setPosts(updatedPosts);
      setLastPost(snapshot.docs[snapshot.docs.length - 1]);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchMorePosts = () => {
    if (lastPost) {
      const q = query(
        collection(db, "posts"),
        orderBy("timestamp", "desc"),
        startAfter(lastPost),
        limit(10)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newPosts = snapshot.docs.map((doc) => doc.data() as Post);
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setLastPost(snapshot.docs[snapshot.docs.length - 1]);
      });

      return unsubscribe;
    }
  };

  return [posts, isLoading, fetchMorePosts];
};

export default useFetchPosts;
