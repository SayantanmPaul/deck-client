"use client";

import { SignIn } from "@/components/SignIn";
import React from "react";
import { permanentRedirect } from "next/navigation";
import { useAuthStore } from "@/context/AuthStore";

const SignInPage = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    permanentRedirect("/dashboard");
  }
  return (
    <div className="">
      <SignIn />
    </div>
  );
};

export default SignInPage;
