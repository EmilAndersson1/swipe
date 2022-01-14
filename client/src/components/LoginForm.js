import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/Input";

import { CssBaseline } from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { ThemeProvider } from "@mui/system";

import theme from "../theme";

import { login } from "../api";

import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const Login = ({ setSession }) => {
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [openUserExists, setOpenUserExists] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      username: loginName,
      password: loginPassword,
    };
    const loginRes = await login(loginData);
    if (loginRes == "no user") {
      setLoginName("");
      setLoginPassword("");
      setOpenUserExists(true);
    }
    if (loginRes == "success") {
      setSession(true);
      navigate(`/profile/${loginData.username}`);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit}>
        <CssBaseline />
        <FormControl fullWidth={true} variant="outlined">
          <InputLabel htmlFor="name-input">Name</InputLabel>
          <OutlinedInput
            value={loginName}
            autoComplete="off"
            id="name-input"
            aria-describedby="my-helper-text"
            name="name"
            onChange={(e) => setLoginName(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth={true} sx={{ mt: 4 }} variant="outlined">
          <InputLabel htmlFor="password-input">Password</InputLabel>
          <OutlinedInput
            value={loginPassword}
            type={showPassword ? "text" : "password"}
            id="password-input"
            aria-describedby="my-helper-text"
            name="password"
            onChange={(e) => setLoginPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  tabIndex="-1"
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  sx={{ mb: 2 }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Collapse in={openUserExists}>
          <Alert
            sx={{ mt: 2 }}
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenUserExists(false);
                }}
              >
                <CloseIcon sx={{}} />
              </IconButton>
            }
          >
            Username and password did not match, try again.
          </Alert>
        </Collapse>
        <Button
          variant="contained"
          type="submit"
          fullWidth={true}
          sx={{ mt: 3, bgcolor: "primary.light" }}
        >
          Login!
        </Button>
      </form>
    </ThemeProvider>
  );
};

export default Login;
