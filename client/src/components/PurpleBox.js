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
      }}
    >
      <Typography variant="h2" sx={{ pt: 6, fontWeight: 550 }}>
        {text}
      </Typography>
    </Box>
  );
};

export default PurpleBox;
