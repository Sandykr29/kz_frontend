import axios from "axios";

const instance = axios.create({
  baseURL: "https://kz-w1l6.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
