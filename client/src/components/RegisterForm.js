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

import FormHelperText from "@mui/material/FormHelperText";

import { ThemeProvider } from "@mui/system";

import theme from "../theme";

import { register } from "../api";

const RegisterForm = () => {
  const [registerName, setRegisterName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    console.log(registerName);
    console.log(registerPassword);
    const registerData = {
      username: registerName,
      password: registerPassword,
    };
    register(registerData);
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
          onChange={(e) => setRegisterName(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth={true} sx={{ mt: 4 }} variant="outlined">
        <InputLabel htmlFor="password-input1">Password</InputLabel>
        <OutlinedInput
          type={showPassword ? "text" : "password"}
          id="password-input1"
          aria-describedby="my-helper-text"
          name="password"
          onChange={(e) => setRegisterPassword(e.target.value)}
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
      {registerConfirmPassword === registerPassword ? (
        <>
          <FormControl fullWidth={true} sx={{ mt: 2 }} variant="outlined">
            <InputLabel htmlFor="password-input2">Confirm Password</InputLabel>
            <OutlinedInput
              type={showConfirmPassword ? "text" : "password"}
              id="password-input2"
              aria-describedby="my-helper-text"
              name="confirmPassword"
              onChange={(e) => setRegisterConfirmPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}
                    sx={{ mb: 2 }}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
            Register!
          </Button>
        </>
      ) : (
        <>
          <FormControl fullWidth={true} sx={{ mt: 2 }} variant="outlined">
            <InputLabel error htmlFor="password-input3">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              error
              type={showConfirmPassword ? "text" : "password"}
              id="password-input3"
              aria-describedby="my-helper-text"
              name="confirmPassword"
              onChange={(e) => setRegisterConfirmPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}
                    sx={{ mb: 2 }}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText error>Passwords must match!</FormHelperText>
          </FormControl>
          <Button
            disabled
            onClick={handleSubmit}
            variant="contained"
            type="submit"
            fullWidth={true}
            sx={{ mt: 5, bgcolor: "primary.light" }}
          >
            Register!
          </Button>
        </>
      )}
    </ThemeProvider>
  );
};

export default RegisterForm;
