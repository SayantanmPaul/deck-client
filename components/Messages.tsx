"use client";
import { cn } from "@/lib/utils";
import { Message } from "@/lib/validations";
import { FC, useRef, useState } from "react";
import moment from "moment";
import Image from "next/image";
import { useAuthStore } from "@/context/AuthStore";
import { ConversationPartnerType } from "@/lib/types";

interface MessagesProps {
  initialMessages: Message[];
  currentUserId: string;
  partner: ConversationPartnerType;
}

const Messages: FC<MessagesProps> = ({ initialMessages, currentUserId, partner }) => {
  const [messages] = useState<Message[]>(initialMessages);

  const scrollDownRef = useRef<HTMLDivElement | null>(null);

  const { user } = useAuthStore();

  return (
    <div
      id="messages"
      className="flex h-full flex-1 flex-col-reverse gap-2 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-w-2  scrollbar-track-blue-lighter scrolling-touch"
    >
      <div ref={scrollDownRef} />
      {messages.map((mes, index) => {
        const isCurrentUser = mes.senderId === currentUserId;

        const hasNextMessageFromSameUser =
          messages[index - 1]?.senderId === messages[index].senderId;

        return (
          <div className="chat-message" key={`${mes._id}-${mes.timeStamp}`}>
            <div
              className={cn("flex items-end gap-2", { "justify-end": isCurrentUser })}
            >
              <div
                className={cn(
                  "flex flex-col space-y-2 text-base max-w-xs mx-1",
                  {
                    "order-1 items-end": isCurrentUser,
                    "order-2 items-start": !isCurrentUser,
                  }
                )}
              >
                <span
                  className={cn(
                    "px-3 py-2 rounded-2xl inline-block font-medium",
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
                className={cn("relative w-8 h-8", {
                  "order-2": isCurrentUser,
                  "order-1": !isCurrentUser,
                  "invisible": hasNextMessageFromSameUser,
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
