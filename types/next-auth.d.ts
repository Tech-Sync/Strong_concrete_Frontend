import { JwtPayload } from "jwt-decode";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    refreshToken: string;
    expireAt: string;
    error?: string;
    user: {
      address: string;
      createdAt: string;
      deletedAt: string | null;
      email: string;
      emailToken: string;
      firstName: string;
      id: number;
      isActive: Boolean;
      isVerified: Boolean;
      lastName: string;
      nrcNo: string;
      phoneNo: string;
      role: number;
      updatedAt: string;
      profilePic: string;
    };
  }

  interface User {
    access: string;
    refresh: string;
    error?:string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access: string;
    refresh: string;
    expiresAt: number;
    error?: string;
    userInfo: {
      profilePic: string;
      id: number;
      firstName: string;
      lastName: string;
      nrcNo: string;
      phoneNo: string;
      address: string;
      role: number;
      email: string;
      isActive: Boolean;
      isVerified: Boolean;
      emailToken: string;
      createdAt: string;
      updatedAt: string;
      deletedAt: string | null;
      iat: number;
      exp: number;
    };
    iat: number;
    exp: number;
    jti: string;
  }

}

interface userInfo extends JwtPayload {
  id: number;
  profilePic: string;
  firstName: string;
  lastName: string;
  nrcNo: string;
  phoneNo: string;
  address: string;
  role: number;
  email: string;
  isActive: Boolean;
  isVerified: Boolean;
  emailToken: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  iat: number;
  exp: number;
}
