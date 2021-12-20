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

const Login = () => {
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    console.log("logging in");
    const loginData = {
      username: loginName,
      password: loginPassword,
    };
    login(loginData);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FormControl fullWidth={true} variant="outlined">
        <InputLabel htmlFor="name-input">Name</InputLabel>
        <OutlinedInput
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
          type={showPassword ? "text" : "password"}
          id="password-input"
          aria-describedby="my-helper-text"
          name="password"
          onChange={(e) => setLoginPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
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
      <Button
        onClick={handleSubmit}
        variant="contained"
        type="submit"
        fullWidth={true}
        sx={{ mt: 5, bgcolor: "primary.light" }}
      >
        Login!
      </Button>
    </ThemeProvider>
  );
};

export default Login;
