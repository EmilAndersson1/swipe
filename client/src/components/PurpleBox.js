import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import SentimentVeryDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentVeryDissatisfiedOutlined';

const PurpleBox = ({ text, failure }) => {

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
        {failure && <SentimentVeryDissatisfiedOutlinedIcon sx={{ fontSize: 75, mt: 3 }} />}
      </Typography>
    </Box>
  );
};

export default PurpleBox;
