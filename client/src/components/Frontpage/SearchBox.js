import React from "react";
import { Grid, Typography, Box, Button, TextField } from "@mui/material";

const SearchBox = () => {
  return (
    <Box
      sx={{
        mt: { xs: 0, sm: 2, md: 2 },
        mb: 7,
        borderRadius: 5,
        p: 5,
        backgroundColor: "rgba(15, 15, 15, 0.9)",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          pb: 1,
          fontSize: "40px",
          fontWeight: 550,
        }}
      >
        Looking for a specific title?
      </Typography>
      <Typography sx={{ pb: 3 }}>
        Do you want to find the movie you watched yesterday with your family and
        add it to your favorites? Find it here!
      </Typography>

      <Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={4} sm={6} md={10}>
          <TextField fullWidth label="Search..."></TextField>
        </Grid>
        <Grid item xs={4} sm={2} md={2}>
          <Button
            color="primary"
            sx={{ py: 2, px: 4, width: "100%" }}
            variant="contained"
          >
            Sök!
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchBox;
