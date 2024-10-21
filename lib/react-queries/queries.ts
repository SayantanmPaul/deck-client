import {
  acceptFriendRequest,
  addNewFriend,
  getAllFriendsOfUser,
  getChatMessages,
  getConversationPartner,
  getCurrentUser,
  getIncomingFriendReqUser,
  ignoreFriendRequest,
  sendMessage,
  signInUser,
  signOutUser,
  signUpUser,
} from "@/api/apiClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { INewUser, IUser } from "../types";
import { useAuthStore } from "@/context/AuthStore";

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
  const { setUser, setIsAuthenticated } = useAuthStore();

  return useMutation({
    mutationFn: () => signOutUser(),
    onSuccess: () => {
      setUser({
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
        avatar: '',
        bio: '',
        userName: '',
        friends: [],
        incomingFriendRequests: [],
        sentFriendRequests: [],
      });
      setIsAuthenticated(false);
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


export const useSendMessage = () => {
  return useMutation({
    mutationFn: (data: { conversationId: string; text: string, file?: File | null }) => {
      return sendMessage({
        conversationId: data.conversationId,
        textMessage: data.text,
        file: data.file
      });
    },
  });
}

export const useGetChatMessages = (conversationId: string) => {
  return useQuery({
    queryKey: ["chatMessages", conversationId],
    queryFn: async () => {
      const chatMessages = getChatMessages(conversationId);
      return chatMessages;
    },
  });
}