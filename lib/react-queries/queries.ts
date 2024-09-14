import {
  signInUser,
  signOutUser,
  signUpUser
} from "@/api/apiClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { INewUser, IUser } from "../types";

export const useSignUpUser = () => {
  return useMutation({
    mutationFn: (user: INewUser) => {
      return signUpUser(user);
    },
  });
};

export const useSignInUser = () => {
  return useMutation({
    mutationFn: (user: IUser) => {
      return signInUser(user);
    },
  });
};

export const useSignOutUser = () => {
  return useMutation({
    mutationFn: () => signOutUser(),
    onSuccess: () => {
      toast.success("Logged out successfully");
      window.location.href = "/signin";
    },
  });
};
