import "./styles/App.css";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Home from "./pages/Home";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#9D34D9",
    },
    secondary: {
      main: "#ff9100",
    },
    divider: grey[800],
    background: {
      paper: grey[900],
    },
    text: {
      primary: '#fff',
      secondary: grey[500],
    },   
  },
});

function App() {
  
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline enableColorScheme />
      <Home />
    </ThemeProvider>
  );
}

export default App;
