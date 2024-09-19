"use client";
import RecentConversations from "@/components/RecentConversations";
import { AddNewFriendSidebarOptions } from "@/components/sidebar/AddNewFriendSidebarOptions";
import FrinedRequestSidebarOptions from "@/components/sidebar/FrinedRequestSidebarOptions";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { useAuthStore } from "@/context/AuthStore";
import {
  useCurrentUserData,
  useSignOutUser,
} from "@/lib/react-queries/queries";
import { cn } from "@/lib/utils";
import DeckLogo from "@/public/deck.svg";
import {
  IconArrowLeft,
  IconSettings,
  IconUserBolt,
  IconUserPlus,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { CircleFadingPlusIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { useEffect, useLayoutEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mutate: signOut } = useSignOutUser();
  const { user, setUser } = useAuthStore();

  const { data: currentUser, isLoading, error } = useCurrentUserData();

  useLayoutEffect(() => {
    if (currentUser) {
      setUser({
        ...currentUser,
        friends: currentUser.friends,
        incomingFriendRequests: currentUser.incomingFriendRequests,
        sentFriendRequests: currentUser.sentFriendRequests,
      });
    }
  }, []);

  if (error) {
    return notFound();
  }

  const links = [
    {
      label: "conversations",
      href: "/dashboard",
      icon: (
        <CircleFadingPlusIcon
          size={22}
          className="text-neutral-700 dark:text-neutral-200 flex-shrink-0"
        />
      ),
    },
    {
      label: "add friend",
      href: "/dashboard/addnewfriend",
      icon: (
        <IconUserPlus
          size={22}
          className="text-neutral-700 dark:text-neutral-200 flex-shrink-0"
        />
      ),
    },
    {
      label: "friends",
      href: "#",
      icon: (
        <IconUserBolt
          size={22}
          className="text-neutral-700 dark:text-neutral-200 flex-shrink-0"
        />
      ),
    },
    {
      label: "settings",
      href: "#",
      icon: (
        <IconSettings
          size={22}
          className="text-neutral-700 dark:text-neutral-200 flex-shrink-0"
        />
      ),
    },
    {
      label: "logout",
      onClick: () => signOut(),
      icon: (
        <IconArrowLeft
          size={22}
          className="text-neutral-700 dark:text-neutral-200 flex-shrink-0"
        />
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <>
              <Logo />
            </>
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} onClick={link.onClick} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: `${user?.firstName} ${user?.lastName}`,
                href: "#",
                icon: user?.avatar ? (
                  <Image
                    src={user?.avatar}
                    alt={user?.firstName}
                    width={120}
                    height={120}
                    draggable={false}
                    priority
                    className="rounded-full w-7 h-7 object-cover"
                  />
                ) : (
                  <div className="rounded-full w-7 h-7 bg-neutral-200 dark:bg-neutral-700 animate-pulse"></div>
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="rounded-xl overflow-hidden w-full m-2 ml-0 bg-black flex">
        <section className="lg:w-96 md:w-1/2 h-full p-6 flex flex-col bg-gray-950">
          <RecentConversations />
          <AddNewFriendSidebarOptions />
          <FrinedRequestSidebarOptions
            initialUnseenReqCount={user.incomingFriendRequests.length as number}
            currentUserId={user._id}
          />
        </section>
        {children}
      </div>
    </div>
  );
}

const Logo = () => {
  return (
    <span className="flex gap-3 select-none items-center">
      <Image
        src={DeckLogo}
        alt="logo"
        width={200}
        height={200}
        draggable={false}
        className="min-w-7 min-h-7 w-7 h-7 object-fill"
        priority
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xl font-bold font-brand text-bold dark:text-white whitespace-pre"
      >
        conversations
      </motion.span>
    </span>
  );
};
