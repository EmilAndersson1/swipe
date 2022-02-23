import React, { useEffect, useState } from "react";
import { Container, CssBaseline } from "@mui/material";
import { Box, ThemeProvider } from "@mui/system";
import Navbar from "../components/Navbar";

import {
  getUser,
  getPopularMovies,
  getTopratedMovies,
  getNowplayingMovies,
  getOneUser,
} from "../api";
import Movies from "../components/Movies";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import theme from "../theme";
import PurpleBox from "../components/PurpleBox";

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
  const [userInfo, setUserInfo] = useState("");
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
      const fetchedUserInfo = await getOneUser(fetchedUser.data.username);
      setUser(fetchedUser.data.username);
      setUserInfo(fetchedUserInfo.data);
      setPopularMovies(fetchedMoviesPopular.data.results);
      setNowPlayingMovies(fetchedMoviesNowplaying.data.results);
      setTopRatedMovies(fetchedMoviesToprated.data.results);
    }
    fetchData();
    return () => {
      setUserInfo("");
      setNowPlayingMovies([]);
      setPopularMovies([]);
      setTopRatedMovies([]);
      setUser("");
    };
  }, []);

  useEffect(() => {}, [popularMovies]);

  return (
    <>
      <Navbar user={user} />

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PurpleBox text={`Swipe`} />

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
            <Movies
              movies={popularMovies}
              username={user}
              userInfo={userInfo}
              setPopularMovies={setNowPlayingMovies}
            />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <Movies
              movies={topRatedMovies}
              username={user}
              userInfo={userInfo}
              setPopularMovies={setNowPlayingMovies}
            />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <Movies
              movies={nowPlayingMovies}
              username={user}
              userInfo={userInfo}
              setPopularMovies={setNowPlayingMovies}
            />
          </TabPanel>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Swipe;
