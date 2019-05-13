import axios from "axios";

export default () => {
  let token = "Testing Tokens";
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return axios.create({
    baseURL: `http://localhost:3000/`
  });
};
