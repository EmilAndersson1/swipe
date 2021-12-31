import React, { useEffect, useState } from "react";
import { Container, CssBaseline, Typography } from "@mui/material";
import { Box, ThemeProvider } from "@mui/system";
import Navbar from "./components/Navbar";

import { getUser, getPopularMovies } from "./api";

import PurpleBox from "./components/PurpleBox";
import theme from "./theme";

function App() {
  const [user, setUser] = useState("");
  useEffect(() => {
    async function fetchData() {
      const fetchedUser = await getUser();

      setUser(fetchedUser.data.username);
    }
    fetchData();
  }, []);
  return (
    <div>
      <Navbar user={user} />

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PurpleBox text={`Homepage`} />
      </ThemeProvider>
      <Container></Container>
    </div>
  );
}

export default App;
