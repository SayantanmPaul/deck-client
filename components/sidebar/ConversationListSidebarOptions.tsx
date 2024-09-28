"use client";

import { useAuthStore } from "@/context/AuthStore";
import { pusherClient } from "@/lib/pusher";
import { FriendRequestType, MessageType } from "@/lib/types";
import { chatHrefConstructor, toPusherKey } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";
import UnseenConversationToast from "../UnseenConversationToast";

interface ConversationListSidebarOptionsProps {
  currentUserId: string;
  friends: FriendRequestType[];
  isLoading: boolean;
}

interface ExtendedMessageType extends MessageType {
  senderAvatar: string;
  senderFirstName: string;
  senderLastName: string;
  senderUserName: string;
}

const ConversationListSidebarOptions: FC<
  ConversationListSidebarOptionsProps
> = ({ currentUserId, friends, isLoading }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { unseenMessages, addUnseenMessage, removeMessages } = useAuthStore();
  const [activeConversations, setActiveConversations] =
    useState<FriendRequestType[]>([]);
  
  useEffect(() => {
    setActiveConversations(friends);
  },[friends])

  //subscribe to the conversation and newfriend update channels
  useEffect(() => {
    if (!currentUserId) return;

    const ConversationChannel = toPusherKey(
      `user:${currentUserId}:conversations`
    );
    const FriendChannel = toPusherKey(`user:${currentUserId}:friends`);

    pusherClient.subscribe(ConversationChannel);
    pusherClient.subscribe(FriendChannel);

    const handleNewConversation = (message: ExtendedMessageType) => {
      const conversationUrl = `/dashboard/conversation/${chatHrefConstructor(
        currentUserId,
        message.senderId
      )}`;

      // toast notifications for the unseen new messages: custom
      const shoudlNotify = pathname !== conversationUrl;
      if (message.senderId === currentUserId || !shoudlNotify) return;

      toast.custom(() => (
        <UnseenConversationToast
          currentUserId={currentUserId}
          senderAvatar={message.senderAvatar}
          senderFirstName={message.senderFirstName}
          senderId={message.senderId}
          senderMessage={message.text}
        />
      ));
      addUnseenMessage(message);
    };

    const handleFriendsUpdate = (newAddedFriend: FriendRequestType) => {
      setActiveConversations((prev) => [...prev, newAddedFriend]);
    };

    //bind the Pusher events to handle new messages and new friends
    pusherClient.bind("new_message", handleNewConversation);
    pusherClient.bind("new_friend", handleFriendsUpdate);

    return () => {
      pusherClient.unsubscribe(ConversationChannel);
      pusherClient.unsubscribe(FriendChannel);

      pusherClient.unbind("new_message", handleNewConversation);
      pusherClient.unbind("new_friend", handleFriendsUpdate);
    };
  }, [currentUserId, pathname, router, addUnseenMessage, friends]);

  //removal unseen messages while the user in conversation with the friend
  useEffect(() => {
    if (pathname?.includes("conversation")) {
      const [frindId1, friendId2] = pathname.split("--");
      const ChatPartnerId = frindId1 === currentUserId ? friendId2 : frindId1;

      //remove unseen messagescount for the chatpartner from the list
      const removeMessageForFriend = (friendId: string) => {
        removeMessages((message) => message.senderId === friendId);
      };
      if (ChatPartnerId) {
        removeMessageForFriend(ChatPartnerId);
      }
    }
  }, [pathname, currentUserId, removeMessages]);


  return (
    <div className="flex flex-col space-y-6">
      <p className="text-xs font-secoundary font-semibold text-neutral-400">
        Recent conversations
      </p>
      <ul role="list" className="min-h-[25rem] overflow-y-auto -mx-2 space-y-2">
        {isLoading &&
          Array(4)
            .fill(null)
            .map((_, index) => <SidebarFriendCardSkeleton key={index} />)}
        {(!isLoading && !friends) || friends?.length === 0 ? (
          <li className=" flex items-center gap-x-3 p-2 rounded-md text-sm font-semibold">
            {" "}
            No friends yet
          </li>
        ) : (
          activeConversations?.sort().map((friend) => {
            const unseenMessageCount = unseenMessages.filter(
              (unseenMessage) => unseenMessage?.senderId === friend._id
            ).length;

            return (
              <li key={friend._id}>
                <Link
                  href={`/dashboard/conversation/${chatHrefConstructor(
                    currentUserId,
                    friend._id
                  )}`}
                  className="text-slate-100 hover:text-indigo-600 hover:bg-neutral-900 group flex items-center gap-x-3 p-2 rounded-md text-sm font-semibold"
                >
                  <Image
                    draggable={false}
                    src={friend.avatar}
                    alt={friend._id}
                    width={40}
                    height={40}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="flex items-center justify-between w-full">
                    {friend.firstName} {friend.lastName}
                    {unseenMessageCount > 0 && (
                      <span className="text-xs font-bold bg-indigo-600 rounded-full text-white w-5 h-5 flex items-center justify-center mr-2">
                        {unseenMessageCount}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default ConversationListSidebarOptions;

export const SidebarFriendCardSkeleton = () => {
  return (
    <div className="flex flex-1 gap-x-3 p-2 items-center">
      <span className="min-w-8 min-h-8 w-8 h-8 bg-neutral-900 animate-pulse rounded-full overflow-visible"></span>
      <div className="w-36 h-5 rounded bg-neutral-900 animate-pulse "></div>
    </div>
  );
};
