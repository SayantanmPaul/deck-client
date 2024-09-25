"use client";

import ConversationInput from "@/components/ConversationInput";
import Messages from "@/components/Messages";
import { useAuthStore } from "@/context/AuthStore";
import {
  useConversationPartnerDetails,
  useGetChatMessages,
} from "@/lib/react-queries/queries";
import { ConversationPartnerType } from "@/lib/types";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FC } from "react";

interface ConversationPageProps {
  params: {
    conversationId: string;
    userId: string;
  };
}

const ConversationPage: FC<ConversationPageProps> = ({ params }) => {
  const { conversationId } = params;

  const { user } = useAuthStore();

  const { data: chats } = useGetChatMessages(conversationId);

  const [userId_1, userId_2] = conversationId.split("--");

  const conversationPartnerId = user._id === userId_1 ? userId_2 : userId_1;

  const { data: partnerData, error } = useConversationPartnerDetails(
    conversationPartnerId as string
  );

  //

  const partnerDetails: ConversationPartnerType =
    partnerData?.conversationPartner;

  if ((user._id !== userId_1 && user._id !== userId_2) || error) {
    return notFound();
  }

  return (
    <div className="flex flex-col flex-1 h-full max-h-[calc(100vh)] justify-between ">
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-neutral-800 px-4 sm:px-6 ">
        <div className="relative flex items-center space-x-4">
          <div className="relative">
            <div className="relative w-6 sm:w-10 h-6 sm:h-10">
              {partnerDetails?.avatar ? (
                <Image
                  fill
                  draggable={false}
                  referrerPolicy="no-referrer"
                  className="rounded-full"
                  src={partnerDetails.avatar}
                  alt={partnerDetails._id}
                />
              ) : (
                <div className="w-6 sm:w-10 h-6 sm:h-10 rounded-full bg-neutral-800 animate-pulse"></div>
              )}
            </div>
          </div>
          <div className="flex flex-col leading-tight select-none">
            <div className="text-xl flex items-center cursor-pointer">
              <span className="text-muted-foreground mr-4 font-bold text-lg">
                {partnerDetails?.firstName} {partnerDetails?.lastName}
              </span>
            </div>
            <span className="text-xs text-muted-foreground font-semibold font-brand">
              @{partnerDetails?.userName}
            </span>
          </div>
        </div>
      </div>
      {chats?.messages && (
        <Messages
          initialMessages={chats.messages}
          currentUserId={user._id}
          partner={partnerDetails}
        />
      )}
      <div className="bg-neutral-800 border-t border-neutral-700">
        <ConversationInput
          conversationId={conversationId}
          chatParner={partnerDetails}
        />
      </div>
    </div>
  );
};

export default ConversationPage;
