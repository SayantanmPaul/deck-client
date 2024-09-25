"use client";

import { FriendRequestType, MessageType } from "@/lib/types";
import { chatHrefConstructor } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC, useState } from "react";

interface ConversationListSidebarOptionsProps {
  currentUserId: string;
  friends: FriendRequestType[];
}

const ConversationListSidebarOptions: FC<
  ConversationListSidebarOptionsProps
> = ({ currentUserId, friends }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [unseenMessages, setUnseenMessages] = useState<MessageType[]>([]);

  // useEffect(() => {
  //   if (pathname?.includes("conversations") as string) {
  //     setUnseenMessages((prev) => {
  //       return prev.filter((message) => {
  //         return !pathname.includes(message.senderId);
  //       });
  //     });
  //   }
  // }, [pathname]);

  return (
    <div className="flex flex-col space-y-6">
      <p className="text-xs font-secoundary font-semibold text-neutral-400">
        Recent conversations
      </p>
      <ul role="list" className="min-h-[25rem] overflow-y-auto -mx-2 space-y-2">
        {friends.sort().map((friend) => {
          const unseenMessageCount = unseenMessages.filter((unseenMessage) => {
            return unseenMessage.senderId === friend._id;
          }).length;

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
        })}
      </ul>
    </div>
  );
};

export default ConversationListSidebarOptions;
