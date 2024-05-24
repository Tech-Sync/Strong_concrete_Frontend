
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Metadata } from "next";
import { useSession } from "next-auth/react";
import React from "react";

export const metadata: Metadata = { title: "Users", description: "Users"};

const UsersPage = () => {

  // const {userInfo, accessToken, refreshToken} = useCurrentUser()

  return (
    <div>
      <p>User Page</p>
    </div>
  );
};

export default UsersPage;
