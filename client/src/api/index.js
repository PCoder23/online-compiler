import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use(
  (req) => {
    if (localStorage.getItem("profile")) {
      req.headers["authorization"] = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`;
    }

    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const signIn = async (data) => {
  API.post("/api/auth/signin", data);
};
export const signUp = async (data) => {
  API.post("/api/auth/signup", data);
};
