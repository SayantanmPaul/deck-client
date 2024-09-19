"use client";

import { useAuthStore } from "@/context/AuthStore";
import { permanentRedirect } from "next/navigation";

const Home = () => {
  const { user } = useAuthStore();

  if (user) {
    permanentRedirect("/dashboard");
  }

  permanentRedirect("/signin");
  return (
    <div className="w-full h-dvh flex flex-col gap-6 items-center justify-center p-6">
      Base route
    </div>
  );
};

export default Home;


