import React from 'react'
import { auth } from "@/auth";

const AccountPage = async() => {
  const session = await auth()
  return (
    <div>AccountPage</div>
  )
}

export default AccountPage