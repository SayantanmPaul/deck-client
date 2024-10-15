"use client";

import { TextHoverEffect } from "@/components/ui/text-hover-effect";

const DashboardPage = () => {
  return (
    <main className="w-full h-dvh flex flex-col justify-center items-center">
      <div className="w-2/3 h-min ">
        <TextHoverEffect automatic duration={0.8} text="Deck" />
      </div>
    </main>
  );
};

export default DashboardPage;
