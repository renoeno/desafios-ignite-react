import axios from "axios";

export const api = axios.create({
  baseURL: "https://murmuring-beyond-44406.herokuapp.com",
});
