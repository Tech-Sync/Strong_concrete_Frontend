"use server";
import { auth } from "@/auth";

const BASE_URL = process.env.NEXT_PUBLIC_APIBASE_URL;

const authConfig = async () => {
  const session = await auth();
  const accessToken = session?.accessToken;

  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
};

export const getAllFirms = async () => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/firms`, {
      cache: "no-cache",
      headers,
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(
        data.message || "Something went wrong, Please try again!"
      );
    }
  } catch (error: any) {
    return { error: error.message };
  }
};

export const deleteFirm = async (id: any) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/firms/${id}`, {
      method: "DELETE",
      headers,
    });

    if (response.status === 204) {
      return { message: "Deleted!" };
    } else {
      throw new Error("Something went wrong, Please try again!");
    }
  } catch (error: any) {
    return { error: error.message };
  }
};

export const deleteMultiFirm = async (ids:any) => {
  const headers = await authConfig();
  try {
    const response = await fetch(`${BASE_URL}/firms/multiple-delete`, {
      method: "POST",
      headers,
      body: JSON.stringify({ids}),
    });

    if (response.status === 204) {
      return { message: "Deleted!" };
    } else {
      throw new Error("Something went wrong, Please try again!");
    }
  } catch (error: any) {
    return { error: error.message };
  }
};

