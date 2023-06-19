import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Container, Menu, MenuItem } from "@mui/material";
import { useAuth } from "../hooks/useAuth";

const AppHeader = () => {
  const { user, signInWithGoogle, signOut } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    signOut();
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Quanta
            </Typography>
            {!user ? (
              <Typography variant="h6" onClick={handleSignIn}>
                Sign in
              </Typography>
            ) : (
              <div>
                <Box display="flex" alignItems="center">
                  <Typography variant="h6">
                    {user.displayName}
                  </Typography>
                  <Avatar
                    src={user.photoURL ?? ""}
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    sx={{ ml: 1 }}
                  />
                </Box>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default AppHeader;
