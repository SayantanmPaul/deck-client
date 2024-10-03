"use client";

import { SignUp } from "@/components/SignUp";
import { useAuthStore } from "@/context/AuthStore";
import { permanentRedirect } from "next/navigation";

const SignUpPage = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    permanentRedirect("/dashboard");
  }
  return <SignUp />;
};

export default SignUpPage;
