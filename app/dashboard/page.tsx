"use client";

import { useSignOutUser } from "@/lib/react-queries/queries";

const DashboardPage = () => {
  const { mutate: signOut } = useSignOutUser();

  const handleUserLogout = () => {
    signOut();
  };

  return (
    <div className="w-full h-dvh flex items-center justify-center flex-col gap-6 bg-black">
      User Login/Created successufully
      <button
        onClick={() => handleUserLogout()}
        className="underline py-5 bg-transparent"
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;


