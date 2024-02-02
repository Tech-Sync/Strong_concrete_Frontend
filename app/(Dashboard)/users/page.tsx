"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useSession } from "next-auth/react";
import React from "react";


const UsersPage = () => {

  const {userInfo, accessToken, refreshToken} = useCurrentUser()

  return (
    <div>
      <p>USER INFO: {JSON.stringify(userInfo)}</p>
      <p>ACCESS TOKEN: {JSON.stringify(accessToken)}</p>
      <p>REFRESH TOKEN: {JSON.stringify(refreshToken)}</p>
    </div>
  );
};

export default UsersPage;
