import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Container, Grid, Paper } from "@mui/material";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/system";

import Navbar from "../components/Navbar";

import theme from "../theme";

import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const Login = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Container disableGutters>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={4} sm={6} md={6}>
            <Box component={Paper}>
              <Box sx={{ mt: "40%", borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  variant="fullWidth"
                  value={tabValue}
                  onChange={handleTabChange}
                  centered
                >
                  <Tab label="Login" sx={{ px: "auto" }} />
                  <Tab label="Register" sx={{ px: "auto" }} />
                </Tabs>
                <TabPanel value={tabValue} index={0}>
                  <LoginForm />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                  <RegisterForm />
                </TabPanel>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
