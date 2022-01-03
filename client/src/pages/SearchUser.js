import React, { useEffect, useState } from "react";
import { Button, Container, CssBaseline } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/system";
import Navbar from "../components/Navbar";
import InputLabel from "@mui/material/InputLabel";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import FormControl from "@mui/material/FormControl";

import OutlinedInput from "@mui/material/Input";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import Divider from "@mui/material/Divider";

import { getAllUsers, getUser } from "../api";

import theme from "../theme";
import PurpleBox from "../components/PurpleBox";

const SearchUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    async function fetchData() {
      const fetchedUser = await getUser();
      const fetchedAllUsers = await getAllUsers();

      setAllUsers(fetchedAllUsers.data);
      setUser(fetchedUser.data.username);
    }
    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar user={user} />
      <PurpleBox text={`Find friends`} />
      <Container maxWidth="sm">
        <FormControl fullWidth={true} sx={{ mb: 4, mt: 3 }}>
          <InputLabel htmlFor="name-input">Search for a friend...</InputLabel>
          <OutlinedInput
            autoComplete="off"
            id="name-input"
            name="name"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </FormControl>
        {allUsers
          .filter(
            (user) =>
              searchTerm.length > 1 && user.username.includes(searchTerm)
          )
          .map((user) => (
            <List>
              <ListItem>
                <ListItemAvatar>
                  <AccountCircleIcon fontSize="large" />
                </ListItemAvatar>
                <ListItemText primary={user.username} />
                <Button onClick={() => navigate(`/profile/${user.username}`)}>
                  Visit {user.username}'s profile
                </Button>
              </ListItem>
              <Divider />
            </List>
          ))}
      </Container>
    </ThemeProvider>
  );
};

export default SearchUser;
