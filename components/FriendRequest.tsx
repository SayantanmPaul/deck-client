import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface FriendRequestProps {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  onAccept: (userId: string) => void;
  onDecline: (userId: string) => void;
  isLoading?: boolean;
}
const FriendRequest: FC<FriendRequestProps> = ({
  _id,
  firstName,
  lastName,
  email,
  avatar,
  onAccept,
  onDecline,
}) => {
  return (
    <>
      <Card className="w-60 p-4 border hover:border-indigo-600 duration-200 ease-in-out flex flex-col items-center gap-4">
        <Avatar className="h-32 w-32 rounded-full">
          <AvatarImage draggable={false} src={avatar} alt={_id} />
          <AvatarFallback>{firstName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="space-y-1 flex flex-col items-center select-none">
          <p className="text-lg font-semibold font-brand">
            {firstName + " " + lastName}
          </p>
          <p className="text-xs text-muted-foreground">{email}</p>
        </div>
        <div className="space-x-4 flex w-full font-medium">
          <Button
            variant="default"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={() => onAccept(_id)}
          >
            Accept
          </Button>
          <Button
            variant="outline"
            onClick={() => onDecline(_id)}
            className="w-full"
          >
            Ignore
          </Button>
        </div>
      </Card>
      {/* </Card> */}
    </>
  );
};

export default FriendRequest;

export const FriendRequestCardSkeleton = () => {
  return (
    <Card className="w-60 p-4 border  duration-200 ease-in-out flex flex-col items-center gap-4">
      <div className="h-32 w-32 rounded-full bg-secondary animate-pulse"></div>
      <div className="space-y-1 flex flex-col items-center select-none">
        <div className="h-5 w-28 bg-secondary rounded-md animate-pulse"></div>
        <div className="h-4 w-36 bg-secondary animate-pulse rounded-md"></div>
      </div>
      <div className="space-x-4 flex w-full">
        <div className="h-8 w-full bg-muted-foreground animate-pulse rounded"></div>
        <div className="h-8 w-full bg-secondary animate-pulse rounded"></div>
      </div>
    </Card>
  );
};
