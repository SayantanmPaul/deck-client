import { useMutation } from "@tanstack/react-query";
import { INewUser, IUser } from "../types";
import { signInUser, signOutUser, signUpUser } from "@/api/apiClient";
import { toast } from "sonner";

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
