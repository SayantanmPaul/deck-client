import { INewUser, IUser } from "@/lib/types";
import axios from "axios";

const BASE_URL = "http://localhost:5001/api/";

export const axiosCLient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosCLient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response) {
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;

        console.log("refreshing token");

        await axiosCLient.post("/user/refresh");
        return axiosCLient(originalRequest);
      }

      return Promise.reject(error);
    }
  }
);

export const signUpUser = async (data: INewUser) => {
  try {
    const response = await axiosCLient.post("/user/signup", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const signInUser = async (data: IUser) => {
  try {
    const response = await axiosCLient.post("/user/signin", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    const response = await axiosCLient.post("/user/logout");
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
