import axios from "axios";

const serverUrl = "http://localhost:8000/api";

export const getUser = () =>
  axios.get(`${serverUrl}/user`, { withCredentials: true });

export const login = (loginData) => {
  console.log(loginData);
  axios({
    method: "POST",
    data: loginData,
    withCredentials: true,
    url: `${serverUrl}/login`,
  }).then((res) => {
    console.log(res.data);
    if (res.data === "success") {
      window.location.replace("/");
    }
  });
};

export const register = (registerData) => {
  console.log(registerData);
  axios({
    method: "POST",
    data: registerData,
    withCredentials: true,
    url: `${serverUrl}/register`,
  }).then((res) => {
    console.log(res.data);
  });
};
