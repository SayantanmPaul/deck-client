"use client";

import { useAuthStore } from "@/context/AuthStore";
import { useSignOutUser } from "@/lib/react-queries/queries";
import { permanentRedirect } from "next/navigation";

const DashboardPage = () => {
  const { isAuthenticated } = useAuthStore();
  const { mutate: signOut } = useSignOutUser();

  if (!isAuthenticated) {
    permanentRedirect("/signin");
  }
  
  const handleUserLogout = () => {
    signOut();
  };
  return (
    <main className="w-full h-dvh">
      <section className="lg:w-96 md:w-1/2 h-auto p-4 flex flex-col justify-between">
        <button
          className="hover:underline text-sm text-rose-500"
          onClick={handleUserLogout}
        >
          Logout
        </button>
      </section>
    </main>
  );
};

export default DashboardPage;
