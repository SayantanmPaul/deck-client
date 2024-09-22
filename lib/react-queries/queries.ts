import {
  acceptFriendRequest,
  addNewFriend,
  getAllFriendsOfUser,
  getConversationPartner,
  getCurrentUser,
  getIncomingFriendReqUser,
  ignoreFriendRequest,
  signInUser,
  signOutUser,
  signUpUser,
} from "@/api/apiClient";
import { useMutation, useQuery } from "@tanstack/react-query";
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
      window.location.href = "/signin";
      toast.success("Logged out successfully");
    },
    onError: (error) => {
      console.log("error", error);
      toast.error(error.message);
    },
  });
};

export const useAddFriend = () => {
  return useMutation({
    mutationFn: (data: { email: string }) => {
      return addNewFriend(data);
    },
  });
};

export const useCurrentUserData = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const currentUserData = await getCurrentUser();
      return currentUserData;
    },
  });
};

export const useIncomingFriendReqUsers = () => {
  return useQuery({
    queryKey: ["incomingFriendReqUsers"],
    queryFn: async () => {
      const friendReqUsers = await getIncomingFriendReqUser();
      return friendReqUsers;
    },
  });
};

export const useAcceptFrindRequest = () => {
  return useMutation({
    mutationFn: (friendId: string) => {
      return acceptFriendRequest({
        senderId: friendId,
      });
    },
  });
};

export const useIgnoreFrindRequest = () => {
  return useMutation({
    mutationFn: (friendId: string) => {
      return ignoreFriendRequest({
        senderId: friendId,
      });
    },
  });
};

export const useFriendsOfUser = () => {
  return useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      const allFriends = getAllFriendsOfUser();
      return allFriends;
    },
  });
};

export const useConversationPartnerDetails = (partnerId: string) => {
  return useQuery({
    queryKey: ["conversationPartnerDetails", partnerId],
    queryFn: async () => {
      const conversationPartnerDetails = getConversationPartner({
        conversationPartnerId: partnerId,
      });
      return conversationPartnerDetails;
    },
    enabled: !!partnerId,
  });
};
