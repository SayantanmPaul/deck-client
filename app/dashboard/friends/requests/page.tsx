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
import React, { useEffect, useState } from "react";
import { FC } from "react";
import NoContentAvaibale from "@/public/no_content.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { pusherClient } from "@/lib/pusher";
import { useAuthStore } from "@/context/AuthStore";
import { toPusherKey } from "@/lib/utils";
import { useRouter } from "next/navigation";

const RequestPage: FC = ({}) => {
  const { data, isLoading } = useIncomingFriendReqUsers();
  const { user } = useAuthStore();
  const router = useRouter();

  const [realtimeFriendReq, setRealtimeFriendReq] = useState<
    FriendRequestType[]
  >([]);

  const { mutate: acceptFriendRequest } = useAcceptFrindRequest();
  const { mutate: ignoreFriendRequest } = useIgnoreFrindRequest();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (data?.incomingFriendReqestUsers) {
      setRealtimeFriendReq(data.incomingFriendReqestUsers);
    }
  }, [data]);

  //realtime friend request update with pusher subscription
  useEffect(() => {
    const channel = toPusherKey(`user:${user._id}:incoming_friend_requests`);

    pusherClient.subscribe(channel);

    const friendReqHandler = (friendRequest: FriendRequestType) => {
      setRealtimeFriendReq((prev) => [...prev, friendRequest]);
    };
    pusherClient.bind("incoming_friend_requests", friendReqHandler);

    return () => {
      pusherClient.unsubscribe(channel);
      pusherClient.unbind("incoming_friend_requests", friendReqHandler);
    };
  }, [user._id]);


  //accept and decline friend request handler fn
  const handleAcceptFriendRequest = (userId: string) => {
    acceptFriendRequest(userId, {
      onSuccess: () => {
        setRealtimeFriendReq((prev) =>
          prev.filter((request) => request._id !== userId)
        );
        queryClient.invalidateQueries({
          queryKey: ["incomingFriendReqUsers", "currentUser"],
        });
        router.refresh();
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
        setRealtimeFriendReq((prev) =>
          prev.filter((request) => request._id !== userId)
        );
        queryClient.invalidateQueries({ queryKey: ["incomingFriendReqUsers", "currentUser"] });
        router.refresh();
        toast.success("Friend request removed");
      },
      onError: (error) => {
        const axiosError = error as AxiosError<ErrorResponse>;
        toast.error(axiosError.response?.data.error || "something went wrong");
      },
    });
  };

  const NoFriendRequest = () => {
    return (
      <div className="w-full h-full min-h-[calc(100vh)] flex flex-col items-center justify-center gap-4">
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

  if (realtimeFriendReq.length <= 0 && !isLoading) {
    return <NoFriendRequest />;
  }

  return (
    <div className="min-h-screen max-w-screen-xl p-5 w-full ">
      <h2 className="lg:text-3xl text-lg font-bold mb-6">Active Friend Requests</h2>
      <ScrollArea className="h-[calc(100vh-12rem)] ">
        <div className="flex flex-wrap gap-6">
          {isLoading
            ? Array(4)
                .fill(null)
                .map((_, index) => <FriendRequestCardSkeleton key={index} />)
            : realtimeFriendReq.map(
                (user: FriendRequestType, index: number) => (
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
                )
              )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default RequestPage;
