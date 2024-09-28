"use client";
import { useAuthStore } from "@/context/AuthStore";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { IconUsers } from "@tabler/icons-react";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

interface FriendRequestSidebarOptionsProps {}

const FriendRequestSidebarOptions: FC<
  FriendRequestSidebarOptionsProps
> = () => {
  const [unseenReqCount, setUnseenReqCount] = useState<number>(0);
  const { user } = useAuthStore();

  useEffect(() => {
    if (user.incomingFriendRequests) {
      setUnseenReqCount(user.incomingFriendRequests.length);
    }
  }, [user]);

  useEffect(() => {
    if (!user?._id) return;

    pusherClient.subscribe(
      toPusherKey(`user:${user._id}:incoming_friend_requests`)
    );

    pusherClient.subscribe(toPusherKey(`user:${user._id}:friends`));

    const friendReqHandler = () => {
      setUnseenReqCount((prev) => prev + 1);
    };

    const friendReqUpdateHandler = () => {
      setUnseenReqCount((prev) => prev - 1);
    };

    //handle accept and decline friend request by pusher subscription
    pusherClient.bind("incoming_friend_requests", friendReqHandler);
    pusherClient.bind("new_friend", friendReqUpdateHandler);
    pusherClient.bind("friend_decline", friendReqUpdateHandler);

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${user._id}:incoming_friend_requests`)
      );
      pusherClient.unsubscribe(toPusherKey(`user:${user._id}:friends`));
      pusherClient.unbind("incoming_friend_requests", friendReqUpdateHandler);
      pusherClient.unbind("new_friend", friendReqUpdateHandler);
      pusherClient.unbind("friend_decline", friendReqUpdateHandler);
    };
  }, [user._id]);

  return (
    <Link
      href={"/dashboard/friends/requests"}
      className="text-neutral-300 hover:text-indigo-600 hover:bg-neutral-900 group flex items-center gap-x-3 p-2 rounded-md text-xs font-semibold"
    >
      <div className="text-white group-hover:text-indigo-600 flex w-8 h-8 shrink-0 items-center justify-center rounded-lg border text-xs font-medium bg-neutral-800">
        <IconUsers className="h-4 w-4" />
      </div>
      <p className="truncate">Friend requests</p>
      {unseenReqCount > 0 && (
        <div className="rounded-full w-4 h-4 text-[10px] flex justify-center items-center text-white bg-indigo-600">
          {unseenReqCount}
        </div>
      )}
    </Link>
  );
};

export default FriendRequestSidebarOptions;
