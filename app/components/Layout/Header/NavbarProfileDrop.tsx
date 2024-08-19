'use client'
import React from "react";
import Dropdown from "../Dropdown";
import Image from "next/image";
import Link from "next/link";
import {
  ProfileLockScreen,
  ProfileMailBoxIcon,
  ProfileSigninIcon,
  UserProfileIcon,
} from "@/app/icons";
import { signOut } from "next-auth/react";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const NavbarProfileDrop = () => {
  const { userInfo } = useCurrentUser()
  const BASE_URL = process.env.NEXT_PUBLIC_APIBASE_URL;

  return (
    <div className="dropdown flex shrink-0">
      <Dropdown
        offset={[0, 8]}
        placement="bottom-end"
        btnClassName="relative group block"
        button={
          <Image
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover object-top saturate-50 group-hover:saturate-100"
            src="/assets/images/calisan.jpg"
            alt="userProfile"
          />
        }
      >
        <ul className="w-[230px] !py-0 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
          <li>
            <div className="flex items-center px-4 py-4">
              <Image
                width={36}
                height={36}
                className="h-10 w-10 rounded-md object-cover object-top"
                src={`${BASE_URL}/image/${userInfo?.profilePic || '/assets/images/profile.png'}`}
                // src={userInfo?.role === 5 ? '/assets/images/calisan.jpg': '/assets/images/profile.jpeg'}
                alt="userProfile"
              />
              <div className="ltr:pl-4 rtl:pr-4">
                <h4 className="text-base">
                  {userInfo?.firstName} {userInfo?.lastName}
                  <span className="rounded bg-success-light px-1 text-xs text-success ltr:ml-2 rtl:ml-2">
                    {userInfo?.role}
                  </span>
                </h4>
                <button
                  type="button"
                  className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white"
                >
                  {userInfo?.email}
                </button>
              </div>
            </div>
          </li>
          <li>
            <Link href="/#" className="dark:hover:text-white">
              <UserProfileIcon />
              Profile
            </Link>
          </li>
          {/*
          <li>
            <Link href="/apps/mailbox" className="dark:hover:text-white">
              <ProfileMailBoxIcon />
              Inbox
            </Link>
          </li>
                <li>
            <Link
              href="/auth/boxed-lockscreen"
              className="dark:hover:text-white"
            >
              <ProfileLockScreen />
              Lock Screen
            </Link>
          </li> */}
          <li className="border-t border-white-light dark:border-white-light/10">
            <div className="w-[230px] !py-0 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
              <button className="!py-3 !pl-4 text-danger flex" onClick={() => signOut()}>
                <ProfileSigninIcon />
                Sign Out
              </button>
            </div>
            {/* <Link href="/auth/boxed-signin" className="!py-3 text-danger">
              <ProfileSigninIcon />
              Sign Out
            </Link> */}
          </li>
        </ul>
      </Dropdown>
    </div>
  );
};

export default NavbarProfileDrop;
