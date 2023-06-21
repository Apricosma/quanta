// import { useState } from 'react';
// import useImageUploader from '../hooks/useImageUploader';
// import { Box, Typography } from '@mui/material';

// const FileUploader: React.FC = () => {
//   const [selectedImage, setSelectedImage] = useState<File | null>(null);
//   const { uploadImage, uploadProgress, error } = useImageUploader();
//   const [downloadURL, setDownloadURL] = useState<string | null>(null);

//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setSelectedImage(event.target.files[0]);
//     }
//   };

//   const handleImageUpload = async () => {
//     if (selectedImage) {
//       try {
//         const url = await uploadImage(selectedImage);
//         setDownloadURL(url);
//       } catch (error) {
//         console.error('Error uploading image:', error);
//       }
//     }
//   };

//   return (
//     <Box>
//       <input type="file" onChange={handleImageChange} />
//       <button onClick={handleImageUpload}>Upload</button>

//       {uploadProgress > 0 && <Typography variant='caption'>Progress: {uploadProgress.toFixed(2)}%</Typography>}
//       {downloadURL && <img src={downloadURL} alt="Uploaded" />}
//       {error && <p>{error}</p>}
//     </Box>
//   );
// };

// export default FileUploader;
