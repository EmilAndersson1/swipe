import React, { useEffect, useState } from "react";
import { Container, CssBaseline, Grid, Typography } from "@mui/material";
import { Box, ThemeProvider } from "@mui/system";
import Navbar from "../components/Navbar";
import { getUser } from "../api";
import PurpleBox from "../components/PurpleBox";
import theme from "../theme";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Paper from "@mui/material/Paper";

function AboutUs() {
  const [user, setUser] = useState("");
  useEffect(() => {
    async function fetchData() {
      const fetchedUser = await getUser();

      setUser(fetchedUser.data.username);
    }
    fetchData();
  }, []);
  return (
    <div>
      <Navbar user={user} />

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PurpleBox text={`About Us`} />


        <Container>
          <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={4} paddingBottom={5} paddingTop={3}>
            <Grid item xs={4} sm={8} md={6}>
              <Card>
                <CardActionArea target="_blank" href="https://www.linkedin.com/in/emil-andersson-494480198/">
                  <CardMedia
                    component="img"
                    height="450"
                    image="https://i.ibb.co/XLPhd3m/emil-2.jpg"
                    alt="emila"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Emil Andersson
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Bachelor of Science - BS, Computer and Information Sciences, General 2019-2022, Malmö University
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={4} sm={8} md={6}>
              <Card>
                <CardActionArea target="_blank" href="https://www.linkedin.com/in/leo-mellberg-holm/">
                  <CardMedia
                    component="img"
                    height="450"
                    image="https://i.ibb.co/Y3Dcq2t/WIN-20220103-12-26-22-Pro-2.jpg"
                    alt="leomh"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Leo Mellberg Holm
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Bachelor of Science - BS, Computer and Information Sciences, General 2019-2022, Malmö University
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item item xs={4} sm={8} md={12}>
              <Box>
                <Paper elevation={5} style={{ padding: "15px", fontWeight: "150px", fontSize: "18px" }}>
                  This project began as a part of a course at Malmö University. There was an idea born out of everyday life... Have you ever sat down on your sofa in  the evening, maybe with your dinner ready, just to get stuck searching for something to watch? We sure have. Whether it is in a relationship or with friends, deciding what to watch is a hassle where wills and feelings collide. We aim to solve this.
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>

      </ThemeProvider>
    </div>
  );
}

export default AboutUs;