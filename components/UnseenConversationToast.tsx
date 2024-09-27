import { chatHrefConstructor, cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface UnseenConversationToastProps {
  currentUserId: string;
  senderId: string;
  senderAvatar: string;
  senderFirstName: string;
  senderMessage: string;
}

const UnseenConversationToast: FC<UnseenConversationToastProps> = ({
  currentUserId,
  senderId,
  senderAvatar,
  senderFirstName,
  senderMessage,
}) => {
  return (
    <div
      className={cn(
        "w-full min-w-80 max-w-xl shadow-lg pointer-events-auto flex flex-1 p-4 space-x-4",
        {
          "animate-enter": true,
        }
      )}
    >
      <Link
        href={`/dashboard/conversation/${chatHrefConstructor(
          currentUserId,
          senderId
        )}`}
      >
        <div className="flex items-center w-full bg-neutral-950 rounded-lg overflow-hidden gap-4">
          <Image
            src={senderAvatar}
            alt={`${senderFirstName} profile picture`}
            width={40}
            height={40}
            className="w-10 h-10 object-cover rounded-full"
          />
          <div className="flex-1 space-y-2 w-full">
            <p className="text-sm font-semibold text-white">
              {senderFirstName} sent you an message
            </p>
            <p className="text-sm text-muted-foreground line-clamp-4">
              {senderMessage}
            </p>
          </div>
        </div>
      </Link>
      <Button
        type="button"
        variant="link"
        onClick={() => toast.dismiss()}
        className="w-min text-muted-foreground py-0 px-0"
      >
        dismiss
      </Button>
    </div>
  );
};

export default UnseenConversationToast;
