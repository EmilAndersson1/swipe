import React, { useEffect, useState } from "react";
import { Container, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import Navbar from "../components/Navbar";

import { getUser } from "../api";

import PurpleBox from "../components/PurpleBox";
import theme from "../theme";

function AboutUs() {
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
        <PurpleBox text={`About Us`} />

        <Container>

        </Container>
      </ThemeProvider>
    </div>
  );
}

export default AboutUs;