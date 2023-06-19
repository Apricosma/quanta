import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import SignInButton from './SignIn';
import UserSection from './UserMenu';

const AppHeader: React.FC = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Quanta
            </Typography>
            {!user ? (
              <SignInButton />
            ) : (
              <UserSection user={user} />
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default AppHeader;
