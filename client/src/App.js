import { Container, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import Navbar from "./components/Navbar";

import theme from "./theme";

function App() {
  return (
    <div>
      <Container>
        <Navbar />
        <ThemeProvider theme={theme}>
          <CssBaseline />
        </ThemeProvider>
      </Container>
    </div>
  );
}

export default App;
