"use client";
import { AddNewFriendSidebarOptions } from "@/components/sidebar/AddNewFriendSidebarOptions";
import ConversationListSidebarOptions from "@/components/sidebar/ConversationListSidebarOptions";
import FriendRequestSidebarOptions from "@/components/sidebar/FriendRequestSidebarOptions";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { useAuthStore } from "@/context/AuthStore";
import {
  useFriendsOfUser,
  useSignOutUser
} from "@/lib/react-queries/queries";
import { cn } from "@/lib/utils";
import DeckLogo from "@/public/deck.svg";
import { IconArrowLeft, IconSettings, IconUserBolt } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { CircleFadingPlusIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mutate: signOut } = useSignOutUser();
  const { user } = useAuthStore();

  const [open, setOpen] = useState(false);

  const {
    data,
    isLoading: friendsOfUserIsLoading,
    error: fetchFreindError,
  } = useFriendsOfUser();

  const friendsOfUser = data?.friends;

  if (fetchFreindError) {
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
          {user ? (
            <div className="flex space-x-7 items-center">
              <Image
                src={user.avatar}
                alt={user.firstName}
                width={140}
                height={140}
                draggable={false}
                priority
                className="rounded-full min-w-7 min-h-7 w-7 h-7 object-cover"
              />
              <span className="flex flex-col">
                <p className="text-md font-medium font-brand text-muted-foreground select-none text-nowrap ">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs font-medium font-brand text-secondary-foreground select-none ">
                  @{user.userName}
                </p>
              </span>
            </div>
          ) : (
            <div className="flex space-x-2 items-center">
              <div className="min-w-7 min-h-7 w-7 h-7 rounded-full animate-pulse bg-muted-foreground"></div>
              <span className="flex flex-col space-y-1 w-full">
                <div className="w-28 h-3 animate-pulse rounded bg-muted-foreground"></div>
                <div className="w-20 h-2 animate-pulse rounded-sm bg-muted-foreground"></div>
              </span>
            </div>
          )}
        </SidebarBody>
      </Sidebar>
      <div className="lg:rounded-xl overflow-hidden w-full lg:m-2 ml-0 bg-neutral-900 flex lg:border border-neutral-600">
        <section
          className={`lg:w-96 max-w-80 min-w-80 md:w-1/2 h-full p-6 flex-col bg-neutral-950 justify-between hidden md:flex ${
            open ? "block" : "hidden"
          }`}
        >
          <ConversationListSidebarOptions
            currentUserId={user._id}
            friends={friendsOfUser}
            isLoading={friendsOfUserIsLoading}
          />
          <div className="flex flex-col">
            <AddNewFriendSidebarOptions />
            <FriendRequestSidebarOptions />
          </div>
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
        Deck
      </motion.span>
    </span>
  );
};
