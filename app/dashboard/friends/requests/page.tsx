"use client";

import FriendRequest, {
  FriendRequestCardSkeleton,
} from "@/components/FriendRequest";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useAcceptFrindRequest,
  useIgnoreFrindRequest,
  useIncomingFriendReqUsers,
} from "@/lib/react-queries/queries";
import { ErrorResponse, FriendRequestType } from "@/lib/types";
import Image from "next/image";
import React from "react";
import { FC } from "react";
import NoContentAvaibale from "@/public/no_content.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";

const RequestPage: FC = ({}) => {
  const { data, isLoading } = useIncomingFriendReqUsers();
  const friendReqUsers = data?.incomingFriendReqestUsers || [];

  const { mutate: acceptFriendRequest } = useAcceptFrindRequest();
  const { mutate: ignoreFriendRequest } = useIgnoreFrindRequest();

  const queryClient = useQueryClient();

  if (friendReqUsers.length <= 0 && !isLoading) {
    return <NoFriendRequest />;
  }

  const handleAcceptFriendRequest = (userId: string) => {
    acceptFriendRequest(userId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["incomingFriendReqUsers", "currentUser", "friends"],
        });
        toast.success("Friend request accepted");
      },
      onError: (error) => {
        const axiosError = error as AxiosError<ErrorResponse>;
        toast.error(axiosError.response?.data.error || "something went wrong");
      },
    });
  };

  const handleDeclineFriendRequest = (userId: string) => {
    ignoreFriendRequest(userId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["incomingFriendReqUsers"] });
        toast.success("Friend request removed");
      },
      onError: (error) => {
        const axiosError = error as AxiosError<ErrorResponse>;
        toast.error(axiosError.response?.data.error || "something went wrong");
      },
    });
  };

  return (
    <div className="min-h-screen max-w-screen-xl p-4 sm:p-8 w-full ">
      <h2 className="text-3xl font-bold mb-6">Active Friend Requests</h2>
      <ScrollArea className="h-[calc(100vh-12rem)] ">
        <div className="flex flex-wrap gap-6">
          {isLoading
            ? Array(4)
                .fill(null)
                .map((_, index) => <FriendRequestCardSkeleton key={index} />)
            : friendReqUsers.map((user: FriendRequestType, index: number) => (
                <FriendRequest
                  key={index}
                  _id={user._id}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  email={user.email}
                  avatar={user.avatar}
                  onAccept={() => handleAcceptFriendRequest(user._id)}
                  onDecline={() => handleDeclineFriendRequest(user._id)}
                />
              ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default RequestPage;

export const NoFriendRequest = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <Image
        src={NoContentAvaibale}
        alt="no_content"
        draggable={false}
        width={600}
        height={600}
        className="w-56 h-56 object-fill"
      />
      <h2 className="text-xl font-medium font-brand text-muted-foreground select-none">
        No Friend Requests received yet
      </h2>
      <Link href={"/dashboard/friends/add"}>
        <Button className="font-semibold text-sm">Add Friend</Button>
      </Link>
    </div>
  );
};
