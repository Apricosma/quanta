import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import SignInButton from "./SignIn";
import UserSection from "./UserMenu";
import icon from "../assets/quantaIcon.svg";

const appbarStyle = {
  width: "85%",
  borderRadius: "0 0 25px 25px",
  background: "rgba(167, 157, 170, 0.18)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(167, 157, 170, 0.48)",
};

const AppHeader: React.FC = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
      <AppBar position="static" color="transparent" sx={{ ...appbarStyle }}>
        <Container>
          <Toolbar>
            <img width={36} src={icon}></img>
            <Typography color="#48D5F9" variant="h4" component="div" sx={{ flexGrow: 1, ml: 0.5, mt: 1 }}>
              Quanta
            </Typography>
            {!user ? <SignInButton /> : <UserSection user={user} />}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default AppHeader;
