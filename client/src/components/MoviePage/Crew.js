import React from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";

import "swiper/swiper.scss";

const Crew = ({ crew }) => {
  return (
    <Box sx={{ mb: 6 }}>
      <Swiper
        grabCursor
        style={{ paddingTop: 20, paddingLeft: 10 }}
        spaceBetween={30}
        breakpoints={{
          299: { slidesPerView: 2, spaceBetween: 30 },
          399: { slidesPerView: 2, spaceBetween: 30 },
          499: { slidesPerView: 3, spaceBetween: 30 },
          599: { slidesPerView: 3, spaceBetween: 30 },
          699: { slidesPerView: 4, spaceBetween: 30 },
          799: { slidesPerView: 4, spaceBetween: 30 },
          899: { slidesPerView: 4, spaceBetween: 25 },
          999: { slidesPerView: 5, spaceBetween: 20 },
          2000: { slidesPerView: 6, spaceBetween: 20 },
        }}
      >
        {crew
          .slice(0, 50)
          .filter(
            (crewMember) =>
              crewMember.job === "Director" || crewMember.job === "Producer"
          )
          .sort((a) => (a.job === "Director" ? -1 : 1))
          .map((actor, i) => (
            <SwiperSlide key={i}>
              <Card sx={{ maxWidth: 300 }}>
                <CardMedia
                  component="img"
                  alt="Actor"
                  height="300"
                  image={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/original/${actor.profile_path}`
                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png"
                  }
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {actor.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontStyle: "italic" }}
                    color="text.secondary"
                  >
                    {actor.job}
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
};

export default Crew;
