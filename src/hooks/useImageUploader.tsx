import { useState } from 'react';
import { app } from '../services/firebaseConfig';
import { ref, uploadBytesResumable, UploadTaskSnapshot, getDownloadURL } from 'firebase/storage';
import { appStorage } from '../services/firebaseConfig';

interface ImageUploaderHook {
  uploadImage: (imageFile: File) => Promise<string>; // Return type is Promise<string>
  uploadProgress: number;
  error: string | null;
}

const useImageUploader = (): ImageUploaderHook => {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const storage = appStorage;

  const uploadImage = (imageFile: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `images/${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        'state_changed',
        (snapshot: UploadTaskSnapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          setError('Error uploading image.');
          reject(error); // Reject the promise on error
        },
        async () => {
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(url); // Resolve the promise with the download URL
          } catch (error) {
            setError('Error retrieving download URL.');
            reject(error); // Reject the promise on error
          }
        }
      );
    });
  };

  return { uploadImage, uploadProgress, error };
};

export default useImageUploader;
