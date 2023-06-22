import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firestore } from "../services/firebaseConfig";

interface User {
  id: string;
  name: string | null | undefined;
  photoURL: string | null | undefined;
}

interface CreatePostInput {
  post: string;
  user: User;
  imageUrl: string | null;
}

const db = firestore;

const useCreatePost = () => {
  const createPost = async (data: CreatePostInput) => {
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

  return createPost;
};

export default useCreatePost;
