"use client";
import { cn, toPusherKey } from "@/lib/utils";
import { Message } from "@/lib/validations";
import { FC, useEffect, useRef, useState } from "react";
import moment from "moment";
import Image from "next/image";
import { useAuthStore } from "@/context/AuthStore";
import { ConversationPartnerType } from "@/lib/types";
import { pusherClient } from "@/lib/pusher";

interface MessagesProps {
  initialMessages: Message[];
  currentUserId: string;
  partner: ConversationPartnerType;
  conversationId: string;
}

const Messages: FC<MessagesProps> = ({ initialMessages, currentUserId, partner, conversationId }) => {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const scrollDownRef = useRef<HTMLDivElement | null>(null);

  //pusher client subscription for messages
  useEffect(() => {
    const channel = toPusherKey(`conversation:${conversationId}`);
    pusherClient.subscribe(channel);

    const messageHandler = (message: Message) => {
      setMessages((prev) => [message, ...prev]);
    };

    pusherClient.bind("incoming_message", messageHandler);

    return () => {
      pusherClient.unsubscribe(channel);
      pusherClient.unbind("incoming_message", messageHandler);
    };
  }, [conversationId]);

  return (
    <div
      id="messages"
      className="flex h-full flex-1 flex-col-reverse gap-2 p-3 overflow-y-auto no-scrollbar"
    >
      <div ref={scrollDownRef} />
      {messages.map((mes, index) => {
        const isCurrentUser = mes.senderId === currentUserId;

        const hasNextMessageFromSameUser =
          messages[index - 1]?.senderId === messages[index].senderId;

        return (
          <div className="chat-message" key={`${mes._id}-${mes.timeStamp}`}>
            <div
              className={cn("flex items-end gap-2", {
                "justify-end": isCurrentUser,
              })}
            >
              <div
                className={cn(
                  "flex flex-col space-y-2 text-base max-w-sm  mx-1 ",
                  {
                    "order-1 items-end": isCurrentUser,
                    "order-2 items-start": !isCurrentUser,
                  }
                )}
              >
                <span
                  className={cn(
                    "px-3 py-2 rounded-2xl inline-block font-medium max-w-sm lg:max-w-full text-pretty text-clip overflow-clip",
                    {
                      "bg-neutral-700 text-neutral-100": isCurrentUser,
                      "bg-neutral-600 text-gray-50": !isCurrentUser,
                      "rounded-br-none":
                        !hasNextMessageFromSameUser && isCurrentUser,
                      "rounded-bl-none":
                        !hasNextMessageFromSameUser && !isCurrentUser,
                    }
                  )}
                >
                  {mes.text}{" "}
                  <span className="ml-4 text-xs text-muted-foreground w-full">
                    {moment(mes.timeStamp).format("LT")}
                  </span>
                </span>
              </div>
              <div
                className={cn("relative w-8 h-8 hidden lg:block md:block", {
                  "order-2": isCurrentUser,
                  "order-1": !isCurrentUser,
                  invisible: hasNextMessageFromSameUser,
                })}
              >
                <Image
                  fill
                  src={!isCurrentUser ? partner?.avatar : user?.avatar}
                  alt="profile picture"
                  className="rounded-full"
                  referrerPolicy="no-referrer"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
