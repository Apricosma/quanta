import "./styles/App.css";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Home from "./pages/Home";
import bg1 from "./assets/bg1.jpg";
import { Box } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#9D34D9",
    },
    secondary: {
      main: "#ff9100",
    },
    divider: grey[600],
    background: {
      paper: grey[900],
    },
    text: {
      primary: "#fff",
      secondary: grey[500],
    },
  },
});

function App() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Box
        component="div"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          backgroundImage: `url(${bg1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(4px)",
        }}
      />

      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Home />
      </ThemeProvider>
    </Box>
  );
}

export default App;
