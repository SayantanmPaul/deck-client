"use client";

import { useSignOutUser } from "@/lib/react-queries/queries";

const DashboardPage = () => {
  const { mutate: signOut } = useSignOutUser();

  const handleUserLogout = () => {
    signOut();
  };

  return (
    <main className="w-full h-dvh bg-black ">
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
