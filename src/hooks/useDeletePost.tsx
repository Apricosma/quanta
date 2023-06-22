import { deleteObject, ref } from 'firebase/storage';
import { doc, deleteDoc } from 'firebase/firestore';
import { useState } from 'react';
import { appStorage, firestore } from '../services/firebaseConfig';

const db = firestore;

const useDeletePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deletePost = async (postId: string, imageUrl: any) => {
    setIsLoading(true);
    setError("");
    setIsSuccess(false);

    try {
      console.log(postId);
      await deleteDoc(doc(db, "posts", postId))

      const storageRef = ref(appStorage, imageUrl);
      await deleteObject(storageRef);

      setIsSuccess(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deletePost,
    isLoading,
    error,
    isSuccess,
  };
};

export default useDeletePost;
