import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { useAuthStore } from "@/context/AuthStore";
import { useFriendsOfUser } from "@/lib/react-queries/queries";
import { IconMessage } from "@tabler/icons-react";
import { notFound, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AddNewFriendSidebarOptions } from "./AddNewFriendSidebarOptions";
import ConversationListSidebarOptions from "./ConversationListSidebarOptions";
import FriendRequestSidebarOptions from "./FriendRequestSidebarOptions";

const SHEET_SIDES = ["left"] as const;

const MobileViewSidebar = () => {
  const { user } = useAuthStore();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, error: fetchFreindError } = useFriendsOfUser();

  const friendsOfUser = data?.friends;

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (fetchFreindError) {
    return notFound();
  }

  return (
    <Sheet open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <SheetTrigger asChild>
        <button onClick={() => setIsOpen(!isOpen)}>
          <IconMessage />
        </button>
      </SheetTrigger>
      <SheetContent
        side={SHEET_SIDES[0]}
        className="h-full w-full flex flex-col gap-3 p-6 justify-between"
      >
        <ConversationListSidebarOptions
          currentUserId={user._id}
          friends={friendsOfUser}
          isLoading={isLoading}
        />
        <div className="flex flex-col">
          <AddNewFriendSidebarOptions />
          <FriendRequestSidebarOptions />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileViewSidebar;
