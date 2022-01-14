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

import { register, login } from "../api";

import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ setSession }) => {
  const navigate = useNavigate();
  const [registerName, setRegisterName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");

  const [openUserExists, setOpenUserExists] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const registerData = {
      username: registerName,
      password: registerPassword,
    };

    const registerRes = await register(registerData);
    console.log(registerRes);
    if (registerRes === "Success") {
      const loginRes = await login(registerData);
      console.log(loginRes);
      if (loginRes == "success") {
        setSession(true);
        navigate(`/profile/${registerData.username}`);
      }
    }
    if (registerRes == "User exists") {
      setRegisterName("");
      setRegisterPassword("");
      setRegisterConfirmPassword("");
      setOpenUserExists(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth={true} variant="outlined">
          <InputLabel htmlFor="name-input">Name</InputLabel>
          <OutlinedInput
            value={registerName}
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
            value={registerPassword}
            type={showPassword ? "text" : "password"}
            id="password-input1"
            aria-describedby="my-helper-text"
            name="password"
            onChange={(e) => setRegisterPassword(e.target.value)}
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
        {registerConfirmPassword === registerPassword ? (
          <>
            <FormControl fullWidth={true} sx={{ mt: 2 }} variant="outlined">
              <InputLabel htmlFor="password-input2">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                value={registerConfirmPassword}
                type={showConfirmPassword ? "text" : "password"}
                id="password-input2"
                aria-describedby="my-helper-text"
                name="confirmPassword"
                onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      tabIndex="-1"
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
                User already exists! Choose another username.
              </Alert>
            </Collapse>

            <Button
              variant="contained"
              type="submit"
              fullWidth={true}
              sx={{ mt: 3, bgcolor: "primary.light" }}
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
                value={registerConfirmPassword}
                type={showConfirmPassword ? "text" : "password"}
                id="password-input3"
                aria-describedby="my-helper-text"
                name="confirmPassword"
                onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      tabIndex="-1"
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
      </form>
    </ThemeProvider>
  );
};

export default RegisterForm;
