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
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export const SignUpUser = async (data: INewUser) => {
  try {
    const response = await axiosCLient.post("/user/signup", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const SignInUser = async (data: IUser) => {
  try {
    const response = await axiosCLient.post("/user/signin", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
