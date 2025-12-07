"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import useAuthStore from "@/store/useUserStore";

import { ReactNode } from "react";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { isLoaded, user } = useUser();
  // @ts-ignore
  // @ts-expect-error
  const registerUser = useAuthStore((state) => state.registerUser);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const email = user.emailAddresses[0]?.emailAddress;
    if (!email) return;

    registerUser(email); // ✅ only runs once after sign-in
  }, [isLoaded, user, registerUser]);

  return children;
}
