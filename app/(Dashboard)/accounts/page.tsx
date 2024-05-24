import React from 'react'
import { auth } from "@/auth";
import { Metadata } from 'next';

export const metadata: Metadata = { title: "Accounts", description: "Accounts"};

const AccountPage = async() => {
  const session = await auth()
  return (
    <div>AccountPage</div>
  )
}

export default AccountPage