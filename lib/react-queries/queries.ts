import { useMutation } from "@tanstack/react-query";
import { INewUser, IUser } from "../types";
import { SignInUser, SignUpUser } from "@/api/apiClient";

export const useSignUpUser = () => {
  return useMutation({
    mutationFn: (user: INewUser) => {
      return SignUpUser(user);
    },
  });
};

export const useSignInUser = () => {
  return useMutation({
    mutationFn: (user: IUser) => {
      return SignInUser(user);
    },
  });
};
