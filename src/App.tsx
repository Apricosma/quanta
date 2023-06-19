import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./styles/App.css";
import { Index } from "./components/Index";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline enableColorScheme />
      <Index name="Jim" age={29} />
    </ThemeProvider>
  );
}

export default App;
