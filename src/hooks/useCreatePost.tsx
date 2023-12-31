import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firestore } from "../services/firebaseConfig";
import { IUser as User } from "../types/IPost";
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
      await addDoc(collection(db, "posts"), postData);
    } catch (error) {
      console.error("Error adding post: ", error);
    }
  };

  return createPost;
};

export default useCreatePost;
