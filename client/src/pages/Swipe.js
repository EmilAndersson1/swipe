import React, { useEffect, useState } from "react";
import { Container, CssBaseline, Typography } from "@mui/material";
import { Box, ThemeProvider } from "@mui/system";
import Navbar from "../components/Navbar";

import {
  getUser,
  getPopularMovies,
  getTopratedMovies,
  getNowplayingMovies,
} from "../api";
import Movies from "../components/Movies";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import theme from "../theme";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const Swipe = (props) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [user, setUser] = useState("");
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  useEffect(() => {
    async function fetchData() {
      const fetchedUser = await getUser();
      const fetchedMoviesPopular = await getPopularMovies();
      const fetchedMoviesToprated = await getTopratedMovies();
      const fetchedMoviesNowplaying = await getNowplayingMovies();
      setPopularMovies(fetchedMoviesPopular.data);
      setNowPlayingMovies(fetchedMoviesNowplaying.data);
      setTopRatedMovies(fetchedMoviesToprated.data);
      setUser(fetchedUser.data.username);
    }
    fetchData();
  }, []);
  return (
    <>
      <Navbar user={user} />

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            height: "200px",
            bgcolor: "primary.main",
            borderRadius: "0 0 160px 160px",
          }}
        ></Box>

        <Container>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            centered
            variant="fullWidth"
          >
            <Tab label="Popular" />
            <Tab label="Top-rated" />
            <Tab label="Now playing" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            {popularMovies && <Movies movies={popularMovies} />}
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            {topRatedMovies && <Movies movies={topRatedMovies} />}
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            {nowPlayingMovies && <Movies movies={nowPlayingMovies} />}
          </TabPanel>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Swipe;