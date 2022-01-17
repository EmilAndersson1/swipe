import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import "swiper/swiper.scss";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

import { Snackbar, Alert, Box, Typography, IconButton } from "@mui/material";
import { postFavorite } from "../../api";
import { Image } from "mui-image";

const FavoriteMovies = ({ movies, username, ownProfile }) => {
  const [favorites, setFavorites] = useState([]);
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();
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
          <SwiperSlide key={i}>
            {ownProfile && (
              <IconButton
                sx={{
                  zIndex: 2,
                  mb: -8,
                  position: "relative",
                  p: 1,
                }}
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
              >
                <DeleteIcon
                  onClick={() => {
                    handleClick();
                    setTimeout(() => {
                      deleteMovie(i);
                    }, 1000);
                  }}
                />
              </IconButton>
            )}

            <Image
              onClick={() => {
                navigate(`/movie/${movie.movie_id}`);
              }}
              sx={{
                boxShadow: "rgba(90, 90, 90, 0.4) 0px 8px 24px",
                cursor: "pointer",
                borderRadius: "10px",
              }}
              src={`https://image.tmdb.org/t/p/original/${movie.movie_poster}`}
            />

            <Typography sx={{ mt: 1, fontWeight: 600 }} variant="body1">
              {movie.movie_title}
            </Typography>
          </SwiperSlide>
        ))}
      </Swiper>

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
