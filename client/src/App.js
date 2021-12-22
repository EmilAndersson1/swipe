import React, { useEffect, useState } from "react";
import { Container, CssBaseline, Typography } from "@mui/material";
import { Box, ThemeProvider } from "@mui/system";
import Navbar from "./components/Navbar";

import { getUser } from "./api";

import theme from "./theme";

function App() {
  const [user, setUser] = useState("");
  useEffect(() => {
    async function fetchData() {
      const fetchedUser = await getUser();

      setUser(fetchedUser.data.username);
      console.log(fetchedUser.data);
    }
    fetchData();
  }, []);
  return (
    <div>
      <Navbar user={user} />

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            height: "250px",
            bgcolor: "primary.main",
            borderRadius: "0 0 50% 50%",
          }}
        >
          <Container>
            <Typography sx={{ mt: 5 }}>{user}</Typography>
          </Container>
        </Box>
      </ThemeProvider>
      <Container></Container>
    </div>
  );
}

export default App;
