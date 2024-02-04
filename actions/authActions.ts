"use server";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";

interface valuesType {
  email: string;
  password: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_APIBASE_URL;

export const login = async (values: valuesType) => {
  const { email, password } = values;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials !" };
        case "CallbackRouteError":
          const errorMessage = error?.cause?.err?.message;
          return { error: errorMessage };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};

export const verifyEmail = async (emailToken: string) => {
  try {
    const res = await fetch(
      `${BASE_URL}/auth/verify-email?emailToken=${emailToken}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return { error: "Something went wrong ! Try again" };
    }
    throw error;
  }
};

export const forgetPassword = async (email: string) => {
  try {
    const res = await fetch(`${BASE_URL}/users/forget-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    } else {
      return data;
    }
  } catch (error: any) {
    return { error: error.message };
  }
};
