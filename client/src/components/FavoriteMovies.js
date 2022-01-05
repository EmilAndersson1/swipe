import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import "swiper/swiper.scss";

import { Snackbar, Paper, Alert, Box, Typography, Fade } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { postFavorite } from "../api";

const FavoriteMovies = ({ movies, username, ownProfile }) => {
  const [favorites, setFavorites] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setFavorites(movies);
  }, [movies]);

  const deleteMovie = (i) => {
    var temp = [...favorites];
    temp.splice(i, 1);
    setFavorites(temp);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      {favorites.length === 0 && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {ownProfile ? (
            <Typography variant="h6" sx={{ mt: 3 }}>
              This is empty..... Go ahead and like som movies&nbsp;
              <Link color="textPrimary" to={`/swipe`} component={RouterLink}>
                here!
              </Link>
            </Typography>
          ) : (
            <Typography variant="h6" sx={{ mt: 3 }}>
              This is empty.....
            </Typography>
          )}
        </Box>
      )}
      <Fade in={favorites.length > 0} timeout={{ enter: 2000 }}>
        <div>
          <Swiper
            style={{ paddingLeft: 65 }}
            breakpoints={{
              299: { slidesPerView: 2, spaceBetween: 30 },
              399: { slidesPerView: 2, spaceBetween: 30 },
              499: { slidesPerView: 3, spaceBetween: 30 },
              599: { slidesPerView: 4, spaceBetween: 30 },
              699: { slidesPerView: 5, spaceBetween: 30 },
              799: { slidesPerView: 6, spaceBetween: 30 },
              899: { slidesPerView: 6, spaceBetween: 25 },
              999: { slidesPerView: 7, spaceBetween: 20 },
              2000: { slidesPerView: 7, spaceBetween: 20 },
            }}
          >
            {favorites.map((movie, i) => (
              <SwiperSlide
                key={i}
                style={{ paddingTop: 30, paddingBottom: 30 }}
              >
                <Paper
                  sx={{
                    boxShadow: "rgba(0, 0, 0, 0.4) 0px 8px 24px",
                    opacity: 1,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "22vh",
                    backgroundImage: `url(
                https://image.tmdb.org/t/p/original/${movie.movie_poster}
              )`,
                  }}
                >
                  {ownProfile && (
                    <CancelIcon
                      onClick={() => {
                        handleClick();
                        setTimeout(() => {
                          deleteMovie(i);
                        }, 1000);

                        postFavorite(
                          movie.movie_id,
                          movie.movie_title,
                          movie.movie_poster,
                          username
                        );
                      }}
                      sx={{
                        p: 1,
                        "&:hover": {
                          color: "darkgrey",
                          cursor: "pointer",
                        },
                      }}
                    />
                  )}
                </Paper>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Fade>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          severity="error"
          onClose={handleClose}
          sx={{ width: "100%", background: "darkred" }}
        >
          Removed from Favorites!
        </Alert>
      </Snackbar>
    </>
  );
};

export default FavoriteMovies;
