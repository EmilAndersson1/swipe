import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";

import "swiper/swiper.scss";
import { motion } from "framer-motion";

const SimilarTitles = ({ similar }) => {
  const navigate = useNavigate();
  return (
    <Box>
      <Swiper
        style={{ paddingTop: 30, paddingLeft: 10 }}
        spaceBetween={30}
        breakpoints={{
          299: { slidesPerView: 1, spaceBetween: 30 },
          399: { slidesPerView: 2, spaceBetween: 30 },
          499: { slidesPerView: 2, spaceBetween: 30 },
          599: { slidesPerView: 3, spaceBetween: 30 },
          699: { slidesPerView: 4, spaceBetween: 30 },
          799: { slidesPerView: 4, spaceBetween: 30 },
          899: { slidesPerView: 4, spaceBetween: 25 },
          999: { slidesPerView: 5, spaceBetween: 20 },
          2000: { slidesPerView: 6, spaceBetween: 20 },
        }}
      >
        {similar.map((movie, i) => (
          <SwiperSlide key={i}>
            <motion.div
              whileHover={{
                scale: 1.1,
                boxShadow: "rgba(200, 200, 200, 0.4) 0px 3px 10px",
                cursor: "pointer",
              }}
            >
              <Card sx={{ maxWidth: 300, mb: 5 }}>
                <CardMedia
                  onClick={() => {
                    navigate(`/movie/${movie.id}`);
                    window.scrollTo(0, 0);
                  }}
                  component="img"
                  alt="movie_poster"
                  height="300"
                  image={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png"
                  }
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {movie.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontStyle: "italic" }}
                    color="text.secondary"
                  >
                    {movie.release_date.substring(0, 4)}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default SimilarTitles;
