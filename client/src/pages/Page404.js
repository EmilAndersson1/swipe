import React, { useEffect, useState } from "react";
import { Container, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import Navbar from "../components/Navbar";

import { getUser } from "../api";

import PurpleBox from "../components/PurpleBox";
import theme from "../theme";
import Grid from "@mui/material/Grid";

function Page404() {
  const [user, setUser] = useState("");
  useEffect(() => {
    async function fetchData() {
      const fetchedUser = await getUser();

      setUser(fetchedUser.data.username);
    }
    fetchData();
  }, []);
  const spanStyle = {
    color: "#aaaaaa",
    width: "100%",
    textAlign: "center",
    padding: "10px 0px",
    border: "1px solid #666666",
    lineHeight: "50px",
  };
  const style404 = {
    backgroundColor: "#744fc6",
    width: "100%",
    textAlign: "center",
    padding: "10px 0px",
    border: "1px solid #aaaaaa",
    fontWeight: 900,
    fontSize: "2em",
  };
  return (
    <div>
      <Navbar user={user} />

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PurpleBox failure />
        <Container maxWidth="sm">
          <Grid
            container
            columns={{ xs: 4, sm: 8, md: 12 }}
            sx={{ boxShadow: "-1px 0px 13px 11px rgba(64,64,64,0.75)", mt: 7 }}
          >
            <Grid
              item
              xs={4}
              sm={8}
              md={12}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "nowrap",
              }}
            >
              <span style={spanStyle}>K</span>
              <span style={spanStyle}>V</span>
              <span style={spanStyle}>N</span>
              <span style={spanStyle}>Z</span>
              <span style={spanStyle}>I</span>
              <span style={spanStyle}>X</span>
              <span style={spanStyle}>M</span>
              <span style={spanStyle}>E</span>
            </Grid>
            <Grid
              item
              xs={4}
              sm={8}
              md={12}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "nowrap",
              }}
            >
              <span style={spanStyle}>T</span>
              <span style={spanStyle}>A</span>
              <span style={spanStyle}>X</span>
              <span style={spanStyle}>L</span>
              <span style={style404}>4</span>
              <span style={style404}>0</span>
              <span style={style404}>4</span>
              <span style={spanStyle}>Y</span>
            </Grid>
            <Grid
              item
              xs={4}
              sm={8}
              md={12}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "nowrap",
              }}
            >
              <span style={spanStyle}>Y</span>
              <span style={spanStyle}>W</span>
              <span style={spanStyle}>V</span>
              <span style={spanStyle}>B</span>
              <span style={spanStyle}>O</span>
              <span style={spanStyle}>Q</span>
              <span style={spanStyle}>D</span>
              <span style={spanStyle}>Y</span>
            </Grid>
            <Grid
              item
              xs={4}
              sm={8}
              md={12}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "nowrap",
              }}
            >
              <span style={spanStyle}>P</span>
              <span style={spanStyle}>A</span>
              <span style={style404}>P</span>
              <span style={style404}>A</span>
              <span style={style404}>G</span>
              <span style={style404}>E</span>
              <span style={spanStyle}>V</span>
              <span style={spanStyle}>J</span>
            </Grid>
            <Grid
              item
              xs={4}
              sm={8}
              md={12}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "nowrap",
              }}
            >
              <span style={spanStyle}>A</span>
              <span style={style404}>N</span>
              <span style={style404}>O</span>
              <span style={style404}>T</span>
              <span style={spanStyle}>S</span>
              <span style={spanStyle}>C</span>
              <span style={spanStyle}>E</span>
              <span style={spanStyle}>W</span>
            </Grid>
            <Grid
              item
              xs={4}
              sm={8}
              md={12}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "nowrap",
              }}
            >
              <span style={spanStyle}>V</span>
              <span style={spanStyle}>X</span>
              <span style={spanStyle}>P</span>
              <span style={spanStyle}>C</span>
              <span style={spanStyle}>F</span>
              <span style={spanStyle}>H</span>
              <span style={spanStyle}>Q</span>
              <span style={spanStyle}>T</span>
            </Grid>
            <Grid
              item
              xs={4}
              sm={8}
              md={12}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "nowrap",
              }}
            >
              <span style={spanStyle}>E</span>
              <span style={style404}>F</span>
              <span style={style404}>O</span>
              <span style={style404}>U</span>
              <span style={style404}>N</span>
              <span style={style404}>D</span>
              <span style={spanStyle}>S</span>
              <span style={spanStyle}>W</span>
            </Grid>
            <Grid
              item
              xs={4}
              sm={8}
              md={12}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "nowrap",
              }}
            >
              <span style={spanStyle}>Q</span>
              <span style={spanStyle}>V</span>
              <span style={spanStyle}>O</span>
              <span style={spanStyle}>S</span>
              <span style={spanStyle}>M</span>
              <span style={spanStyle}>F</span>
              <span style={spanStyle}>V</span>
              <span style={spanStyle}>U</span>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Page404;
