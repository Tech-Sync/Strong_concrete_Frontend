import React from "react";
import DefaultLayout from "../components/Layout/DefaultLayout";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";


export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session} refetchInterval={60 * 60 * 24}>
      <DefaultLayout>{children}</DefaultLayout>
    </SessionProvider>
  );
}
