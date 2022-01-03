import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Container, Grow, Grid } from "@mui/material";

import { CssBaseline, Button } from "@mui/material";
import { ThemeProvider } from "@mui/system";

import { getOneUser, getUser } from "../api";

import Navbar from "../components/Navbar";
import PurpleBox from "../components/PurpleBox";

import theme from "../theme";
import FavoriteMovies from "../components/FavoriteMovies";
import Friends from "../components/Friends";

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState("");
  const [session, setSession] = useState("");
  const navigate = useNavigate();
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const fetchedUser = await getOneUser(username);
      const session = await getUser();
      !fetchedUser.data && navigate(`/404`);
      setSession(session.data);
      setUser(fetchedUser.data);
    }
    fetchData();
    return () => {
      setUser("");
      setSession("");
    };
  }, [username]);

  const handleFollow = () => {
    setFollowing((prev) => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar user={session.username} />
      <PurpleBox text={`Profile`} />
      <Container disableGutters>
        <Box
          sx={{
            backgroundColor: "#333333",
            mt: 5,
            borderRadius: 10,
            minHeight: "70vh",
            mb: 10,
            pb: 10,
          }}
        >
          <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={4} sm={8} md={1}>
              <Typography variant="h4" sx={{ pl: 7, mt: 2 }}>
                {user.username}
              </Typography>
            </Grid>
            <Grid item item xs={4} sm={8} md={6}>
              {username !== session.username && !following ? (
                <Grow in={!following} timeout={{ enter: 1500 }}>
                  <Button
                    onClick={handleFollow}
                    variant="outlined"
                    sx={{ ml: 7, mt: 2 }}
                  >
                    Follow
                  </Button>
                </Grow>
              ) : null}
              {username !== session.username && following ? (
                <Grow in={following} timeout={{ enter: 1500 }}>
                  <Button
                    onClick={handleFollow}
                    variant="outlined"
                    sx={{ ml: 7, mt: 2 }}
                  >
                    Unfollow
                  </Button>
                </Grow>
              ) : null}
            </Grid>

            <Grid item xs={4} sm={8} md={12}>
              <Typography variant="h4" sx={{ pl: 7 }}>
                Your friends
              </Typography>
              <Friends />
            </Grid>
            <Grid item xs={4} sm={8} md={12}>
              <Typography variant="h4" sx={{ pl: 7 }}>
                Favorite Movies
              </Typography>
              {user.favorites && (
                <FavoriteMovies
                  movies={user.favorites}
                  username={user.username}
                />
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Profile;
