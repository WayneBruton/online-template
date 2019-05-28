import axios from "axios";

export default () => {
  let token = "Testing Tokens";
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  console.log(process.env.VUE_APP_BASEURL)
  return axios.create({
    baseURL: process.env.VUE_APP_BASEURL
  }); 
  
};
