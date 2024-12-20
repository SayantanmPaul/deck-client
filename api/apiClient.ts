import { INewUser, IUser } from "@/lib/types";
import axios from "axios";

const isDevMode = false;

const BASE_URL = "http://localhost:5001/api/";

const PRODUCTION_URL = "https://deck-server.vercel.app/api";

export const axiosCLient = axios.create({
  baseURL: isDevMode ? BASE_URL : PRODUCTION_URL,
  withCredentials: true,
});

//response interceptor to handle token refresh and retry logic
axiosCLient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error);
    const originalRequest = error.config;
    if (error.response) {
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;

        console.log("refreshing token");

        try {
          await axiosCLient.post("/user/refresh");
          return axiosCLient(originalRequest);
        } catch (refreshTokneError) {
          // window.location.href = "/signin";
          return Promise.reject(refreshTokneError);
        }
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
    throw error;
  }
};

export const signInUser = async (data: IUser) => {
  try {
    const response = await axiosCLient.post("/user/signin", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    const response = await axiosCLient.post("/user/logout");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axiosCLient.get("/user");
    return response.data.user;
  } catch (error) {
    throw error;
  }
};

export const addNewFriend = async (data: { email: string }) => {
  try {
    const response = await axiosCLient.post("/user/add-friend", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getIncomingFriendReqUser = async () => {
  try {
    const response = await axiosCLient.get("/user/friend-requests");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const acceptFriendRequest = async (data: { senderId: string }) => {
  try {
    const response = await axiosCLient.post(
      "/user/friend-requests/accept",
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const ignoreFriendRequest = async (data: { senderId: string }) => {
  try {
    const response = await axiosCLient.post(
      "/user/friend-requests/decline",
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllFriendsOfUser = async () => {
  try {
    const response = await axiosCLient.get("/user/friends");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getConversationPartner = async ({
  conversationPartnerId,
}: {
  conversationPartnerId: string;
}) => {
  try {
    const response = await axiosCLient.get(
      `/user/conversation/partnerDetails?conversationPartnerId=${conversationPartnerId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendMessage = async (data: {
  conversationId: string;
  textMessage: string;
  file?: File | null;
}) => {
  try {
    const formData = new FormData();
    formData.append("conversationId", data.conversationId);
    formData.append("textMessage", data.textMessage);

    if (data.file) {
      formData.append("file", data.file);
    }
    const response = await axiosCLient.post(
      "/user/conversation/send",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getChatMessages = async (conversationId: string) => {
  try {
    const response = await axiosCLient.get(
      `/user/conversation/messages?conversationId=${conversationId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
