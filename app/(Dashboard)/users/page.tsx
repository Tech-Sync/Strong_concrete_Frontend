
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Metadata } from "next";
import { useSession } from "next-auth/react";
import React from "react";
import UserTable from "./_components/UserTable";
import BreadCrumb from "@/app/components/common/BreadCrumb";

export const metadata: Metadata = { title: "Users", description: "Users" };

const UsersPage = () => {

  // const {userInfo, accessToken, refreshToken} = useCurrentUser()

  return (
    <>
      <BreadCrumb />

      <UserTable />
    </>
  );
};

export default UsersPage;
