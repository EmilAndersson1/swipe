import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const PurpleBox = ({ text }) => {
  console.log(text);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "200px",
        bgcolor: "primary.main",
        borderRadius: "0 0 50% 50%",
        boxShadow: "rgba(255, 255, 255, 0.2) 0px 8px 24px",
        mb: 3,
      }}
    >
      <Typography variant="h2" sx={{ pt: 6, fontWeight: 550 }}>
        {text}
      </Typography>
    </Box>
  );
};

export default PurpleBox;
