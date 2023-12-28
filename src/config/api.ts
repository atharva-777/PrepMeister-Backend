import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.BASE_URL}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});