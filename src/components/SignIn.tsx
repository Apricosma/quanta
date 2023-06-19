import React from 'react';
import Typography from '@mui/material/Typography';
import { signInWithGoogle } from '../services/firebaseConfig';

const SignInButton: React.FC = () => {
  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Typography variant="h6" onClick={handleSignIn}>
      Sign in
    </Typography>
  );
};

export default SignInButton;
