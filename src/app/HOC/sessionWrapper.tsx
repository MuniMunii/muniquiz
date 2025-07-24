'use client';

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function SessionWrapper({
  children,
  // session,
}: {
  children: ReactNode;
  // session: Session | null;
}) {
  return <SessionProvider refetchInterval={60} refetchOnWindowFocus={true}>{children}</SessionProvider>;
}
