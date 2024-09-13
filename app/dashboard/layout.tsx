"use client";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { useSignOutUser } from "@/lib/react-queries/queries";
import { cn } from "@/lib/utils";
import DeckLogo from "@/public/deck.svg";
import { IconArrowLeft, IconSettings, IconUserBolt } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { CircleFadingPlusIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mutate: signOut } = useSignOutUser();

  const links = [
    {
      label: "conversations",
      href: "#",
      icon: (
        <CircleFadingPlusIcon
          size={22}
          className="text-neutral-700 dark:text-neutral-200 flex-shrink-0"
        />
      ),
    },
    {
      label: "profile",
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
                label: "Manu Arora",
                href: "#",
                icon: (
                  <div className="min-w-7 min-h-7 rounded-full bg-white"></div>
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="rounded-xl overflow-hidden w-full m-2 ml-0">{children}</div>
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
